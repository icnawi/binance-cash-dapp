import circomlib from 'circomlib';
import crypto from 'node:crypto';
import snarkjs from 'snarkjs';
import websnarkUtils from 'websnark/src/utils';

import { BscScanAPI } from './bsc-scan.js';
import { Web3API } from './web3';
import { i18n } from '../../i18n';
import { TxStatus } from '../../ui/config';
import { fromDecimals, getNetworkConfig, getTokenConfig } from '../../utils';
import MixerAbi from '../contracts/Mixer.abi.json';
import ProxyAbi from '../contracts/TornadoProxy.abi.json';
import { build as buildGroth16 } from '../lib/groth16.js';
import { MerkleTree } from '../lib/merkle-tree.js';

const Topics = {
  Deposit: '0xa945e51eec50ab98c161376f0db4cf2aeba3ec92755fe2fcd388bdbbb80ff196',
  Withdrawal: '0xe9e508bad6d4c3227e881ca19068f099da81b5164dd6d62b2eaf1e8bc6c34931',
};
const { bigInt } = snarkjs;

/** Generate random number of specified byte length */
const rbigint = nbytes => snarkjs.bigInt.leBuff2int(crypto.randomBytes(nbytes));

/** Compute pedersen hash */
const pedersenHash = data => circomlib.babyJub.unpackPoint(circomlib.pedersenHash.hash(data))[0];

/** BigNumber to hex string of specified length */
const toHex = (number, length = 32) => {
  const str = number instanceof Buffer ? number.toString('hex') : bigInt(number).toString(16);
  return `0x${str.padStart(length * 2, '0')}`;
};

const getRelayerUrl = (netId, relayer) => {
  const networkConfig = getNetworkConfig(netId);

  if (relayer.url === 'default' && networkConfig) {
    return networkConfig.relayerApis[0].url.replace(/\/$/, '');
  }

  return relayer.url.replace(/\/$/, '');
};

const getInstanceContractAddress = (networkConfig, depositAmount) => {
  return networkConfig.amounts.find(({ amount }) => Number(amount) === Number(depositAmount))
    .instanceContract;
};

async function loadAllDeposits(netId, contractAddress) {
  const contract = Web3API.getContract(MixerAbi, contractAddress);
  const allDeposits = await BscScanAPI.getLogs(netId, contractAddress, Topics.Deposit);

  if (allDeposits.length > 0) {
    const lastBlockNumber = Number(allDeposits[allDeposits.length - 1].blockNumber);
    const lastEvent = (
      await contract.getPastEvents('Deposit', {
        fromBlock: lastBlockNumber,
        toBlock: lastBlockNumber,
      })
    )[0];

    return {
      total: Number(lastEvent?.returnValues?.leafIndex) + 1,
      allDeposits,
    };
  }

  return {
    total: 0,
    allDeposits: [],
  };
}

async function loadLastDeposits(netId, contractAddress, limit = 10, initialRange = 100000) {
  const contract = Web3API.getContract(MixerAbi, contractAddress);
  const currentBlock = await Web3API.getBlockNumber();
  let range = initialRange;
  let deposits = await BscScanAPI.getLogs(
    netId,
    contractAddress,
    Topics.Deposit,
    currentBlock - range,
  );

  while (deposits.length < limit && currentBlock - range > 0) {
    range *= 5;
    deposits = await BscScanAPI.getLogs(
      netId,
      contractAddress,
      Topics.Deposit,
      currentBlock - range,
    );
  }

  if (deposits.length > 0) {
    const lastBlockNumber = Number(deposits[deposits.length - 1].blockNumber);
    const lastEvent = (
      await contract.getPastEvents('Deposit', {
        fromBlock: lastBlockNumber - 100,
        toBlock: lastBlockNumber,
      })
    )?.pop();
    return {
      total: Number(lastEvent?.returnValues?.leafIndex) + 1,
      deposits: deposits.slice(-limit).reverse(),
    };
  }

  return {
    total: 0,
    deposits: [],
  };
}

async function loadDepositByCommitment(netId, contractAddress, commitmentHex) {
  const contract = Web3API.getContract(MixerAbi, contractAddress);
  const { total, allDeposits } = await loadAllDeposits(netId, contractAddress);
  const foundDeposit = allDeposits.find(deposit => deposit.topics[1] === commitmentHex);
  const blockNumber = Number(foundDeposit.blockNumber);
  const deposit = (
    await contract.getPastEvents('Deposit', { fromBlock: blockNumber, toBlock: blockNumber })
  )[0];
  return {
    total,
    allDeposits,
    deposit,
  };
}

async function loadWithdrawalByNullifier(netId, contractAddress, nullifierHex, fromBlock) {
  const contract = Web3API.getContract(MixerAbi, contractAddress);
  const withdrawals = await BscScanAPI.getLogs(
    netId,
    contractAddress,
    Topics.Withdrawal,
    fromBlock,
  );
  const withdrawal = withdrawals.find(({ data }) => data.includes(nullifierHex));
  return (
    await contract.getPastEvents('Withdrawal', {
      fromBlock: withdrawal.blockNumber,
      toBlock: withdrawal.blockNumber,
    })
  )[0];
}

/**
 * Generate deposit object from secret and nullifier
 */
function generateDeposit({ nullifier, secret }) {
  const deposit = { nullifier, secret };
  deposit.preimage = Buffer.concat([
    deposit.nullifier.leInt2Buff(31),
    deposit.secret.leInt2Buff(31),
  ]);
  deposit.commitment = pedersenHash(deposit.preimage);
  deposit.commitmentHex = toHex(deposit.commitment);
  deposit.nullifierHash = pedersenHash(deposit.nullifier.leInt2Buff(31));
  deposit.nullifierHex = toHex(deposit.nullifierHash);
  return deposit;
}

function calculateRelayerFee({ gasPrice, amount, relayerServiceFee, protocolFee, decimals }) {
  const decimalsPoint =
    Math.floor(relayerServiceFee) === Number(relayerServiceFee)
      ? 0
      : relayerServiceFee.toString().split('.')[1].length;
  const roundDecimal = 10 ** decimalsPoint;
  const amountWei = toBN(fromDecimals(amount, decimals));
  const protocol = toBN(fromDecimals(amount * protocolFee, decimals));
  const relayer = amountWei
    .mul(toBN(Math.round(relayerServiceFee * roundDecimal)))
    .div(toBN(roundDecimal * 100));
  const network = toBN(gasPrice).mul(toBN(4.8e5));
  const total = network.add(relayer);
  return {
    gasPrice: toBN(gasPrice),
    protocolFeePercent: protocolFee * 100,
    network,
    protocol,
    relayer,
    total,
  };
}

function calculateWalletFee({ amount, protocolFee, decimals }) {
  const protocol = toBN(fromDecimals(amount * protocolFee, decimals));
  return {
    protocolFeePercent: protocolFee * 100,
    protocol,
    total: protocol,
  };
}

/**
 * Generate merkle tree for a deposit.
 * Download deposit events from the tornado, reconstructs merkle tree, finds our deposit leaf
 * in it and generates merkle proof
 */
async function generateMerkleProof(contractAddress, depositData, treeHeight) {
  const mixerContract = Web3API.getContract(MixerAbi, contractAddress);
  const leafIndex = toBN(depositData.deposit.returnValues.leafIndex).toNumber();

  const leaves = depositData.allDeposits
    .sort((a, b) => Number(a.timeStamp) - Number(b.timeStamp)) // Sort events in chronological order
    .map(e => {
      return e.topics[1];
    });
  const tree = new MerkleTree(treeHeight, leaves);

  const root = await tree.root();
  const isValidRoot = await mixerContract.methods.isKnownRoot(toHex(root)).call();

  if (!isValidRoot) {
    throw new Error(i18n.t('treeCorruptedError'));
  }
  if (!depositData.deposit) {
    throw new Error(i18n.t('depositNotFoundError'));
  }

  return tree.path(leafIndex);
}

/**
 * Generate SNARK proof for withdrawal
 */
async function generateProof({
  contractAddress,
  deposit,
  recipient,
  relayerAddress = 0,
  fee = 0,
  refund = 0,
  treeHeight = 20,
}) {
  // Compute merkle proof of our commitment
  const { root, pathElements, pathIndex } = await generateMerkleProof(
    contractAddress,
    deposit,
    treeHeight,
  );
  const groth16 = await buildGroth16();

  // Prepare circuit input
  const input = {
    // Public snark inputs
    root: toHex(root),
    nullifierHash: deposit.depositParams.nullifierHash,
    recipient: bigInt(recipient),
    relayer: bigInt(relayerAddress),
    fee: bigInt(fee),
    refund: bigInt(refund),

    // Private snark inputs
    nullifier: deposit.depositParams.nullifier,
    secret: deposit.depositParams.secret,
    pathElements,
    pathIndices: pathIndex,
  };

  const circuit = await (await fetch('tornado.json')).json();
  const provingKey = await (await fetch('tornadoProvingKey.bin')).arrayBuffer();
  const proofData = await websnarkUtils.genWitnessAndProve(groth16, input, circuit, provingKey);
  const { proof } = websnarkUtils.toSolidityInput(proofData);

  const args = [
    toHex(input.root),
    toHex(input.nullifierHash),
    toHex(input.recipient, 20),
    toHex(input.relayer, 20),
    toHex(input.fee),
    toHex(input.refund),
  ];

  return { proof, args };
}

export const TornadoAPI = {
  /**
   * Create deposit object from secret and nullifier
   */
  createDeposit: (amount, netId) => {
    const tokenConfig = getTokenConfig(netId);
    const deposit = generateDeposit({
      nullifier: rbigint(31),
      secret: rbigint(31),
    });
    deposit.note = `binancecash-${tokenConfig.token.toLowerCase()}-${amount}-${netId}-${toHex(
      deposit.preimage,
      62,
    )}`;

    return deposit;
  },

  deposit: (netId, amount, commitmentHex) => {
    const tokenConfig = getTokenConfig(netId);
    const networkConfig = getNetworkConfig(netId);
    const senderAccount = Web3API.getAccount();
    const proxyContract = Web3API.getContractMetamask(ProxyAbi, networkConfig.proxyContract);
    const instanceContract = getInstanceContractAddress(networkConfig, amount);
    const value = fromDecimals(Number(amount), Number(tokenConfig.decimals));

    return proxyContract.methods.deposit(instanceContract, commitmentHex, []).send({
      value,
      from: senderAccount,
      gas: 1.2e6,
      gasPrice: 10e9,
    });
  },

  getLatestDeposits: async (netId, amount, limit) => {
    const networkConfig = getNetworkConfig(netId);
    const contractAddress = getInstanceContractAddress(networkConfig, amount);
    return contractAddress
      ? await loadLastDeposits(netId, contractAddress, limit)
      : { total: 0, deposits: [] };
  },

  getTransactionStatus: async tx => {
    const networkConfig = getNetworkConfig(tx.network);
    const contractAddress = getInstanceContractAddress(networkConfig, tx.amount);

    try {
      if (tx.txStatus === TxStatus.DEPOSITED) {
        const mixerContract = Web3API.getContract(MixerAbi, contractAddress);
        const isSpent = await mixerContract?.methods?.isSpent(tx.nullifierHex).call();
        return isSpent ? TxStatus.SPENT : TxStatus.DEPOSITED;
      }

      if (tx.txStatus === TxStatus.WAITING_FOR_RECEIPT) {
        const receipt = await Web3API.getTransactionReceipt(tx.transactionHash);
        if (!receipt) {
          return TxStatus.WAITING_FOR_RECEIPT;
        }
        return receipt.status ? TxStatus.DEPOSITED : TxStatus.FAILED;
      }
    } catch (err) {
      console.error(err);
    }

    return tx.txStatus;
  },

  /**
   * Parses Tornado.cash note
   */
  parseNote: async (noteString, currentNetId, failOnSpent) => {
    const noteRegex =
      /binancecash-(?<currency>\w+)-(?<amount>[\d.]+)-(?<netId>\d+)-0x(?<note>[0-9a-fA-F]{124})/g;
    const match = noteRegex.exec(noteString);
    const error = new Error();

    if (!match) {
      error.noteError = 'note is invalid';
      throw error;
    }
    const netId = Number(match.groups.netId);

    if (Number(netId) !== Number(currentNetId)) {
      error.noteError = i18n.t('anotherNetworkNoteError');
      throw error;
    }

    const buf = Buffer.from(match.groups.note, 'hex');
    const nullifier = bigInt.leBuff2int(buf.slice(0, 31));
    const secret = bigInt.leBuff2int(buf.slice(31, 62));
    const depositParams = generateDeposit({ nullifier, secret });

    const networkConfig = getNetworkConfig(netId);
    const contractAddress = getInstanceContractAddress(networkConfig, match.groups.amount);
    const mixerContract = Web3API.getContract(MixerAbi, contractAddress);
    const { total, deposit, allDeposits } = await loadDepositByCommitment(
      netId,
      contractAddress,
      depositParams.commitmentHex,
    );
    const isSpent = await mixerContract.methods.isSpent(toHex(depositParams.nullifierHash)).call();

    if (isSpent && failOnSpent) {
      error.noteError = i18n.t('noteSpentError');
      throw error;
    }
    const receipt = await Web3API.getTransactionReceipt(deposit.transactionHash);

    return {
      currency: match.groups.currency,
      amount: match.groups.amount,
      timeStamp: Number(deposit.returnValues.timestamp) * 1000,
      subsequentDeposits: total - Number(deposit.returnValues.leafIndex) - 1,
      netId,
      depositParams,
      deposit,
      receipt,
      allDeposits,
      isSpent,
    };
  },

  getRelayerInfo: async (netId, relayer) => {
    const relayerUrl = getRelayerUrl(netId, relayer);
    let error;
    let status;

    try {
      status = await (await fetch(`${relayerUrl}/status`)).json();
    } catch (err) {
      error = i18n.t('cantFetchStatusError');
    }

    if (status && netId !== status.netId) {
      error = i18n.t('differentNetRelayerError');
    }

    return {
      ...relayer,
      url: relayerUrl,
      status,
      error,
    };
  },

  getFee: async (amount, netId, relayer = 'default') => {
    const gasPrice = await Web3API.getGasPrice('fast');
    const relayerUrl = getRelayerUrl(netId, relayer);
    const tokenConfig = getTokenConfig(netId);
    const networkConfig = getNetworkConfig(netId);
    const relayerStatus = await (await fetch(`${relayerUrl}/status`)).json();
    const relayerFee = calculateRelayerFee({
      gasPrice,
      amount,
      relayerServiceFee: relayerStatus.tornadoServiceFee,
      protocolFee: Number(networkConfig.protocolFeePercent) / 100,
      decimals: Number(tokenConfig.decimals),
    });
    const walletFee = calculateWalletFee({
      amount,
      protocolFee: Number(networkConfig.protocolFeePercent) / 100,
      decimals: Number(tokenConfig.decimals),
    });

    return {
      relayerFee,
      walletFee,
    };
  },

  getProof: async (deposit, fee, recipient, relayer, useWallet) => {
    const networkConfig = getNetworkConfig(deposit.netId);
    const contractAddress = getInstanceContractAddress(networkConfig, deposit.amount);

    if (useWallet) {
      const { proof, args } = await generateProof({
        contractAddress,
        deposit,
        recipient,
        fee,
        treeHeight: Number(networkConfig.merkleTreeHeight),
      });
      return { proof, args };
    }

    const relayerUrl = getRelayerUrl(deposit.netId, relayer);
    const { rewardAccount: relayerAddress } = await (await fetch(`${relayerUrl}/status`)).json();
    const { proof, args } = await generateProof({
      contractAddress,
      deposit,
      recipient,
      relayerAddress,
      fee,
      treeHeight: Number(networkConfig.merkleTreeHeight),
    });
    return { proof, args };
  },

  withdrawByWallet: (depositData, proof, args) => {
    const networkConfig = getNetworkConfig(depositData.netId);
    const contract = getInstanceContractAddress(networkConfig, depositData.amount);
    const senderAccount = Web3API.getAccount();
    const proxyContract = Web3API.getContractMetamask(ProxyAbi, networkConfig.proxyContract);
    return proxyContract.methods.withdraw(contract, proof, ...args).send({
      value: 0,
      from: senderAccount,
      gas: 1.2e6,
      gasPrice: 10e9,
    });
  },

  withdrawByRelayer: async (depositData, proof, args, relayer) => {
    const networkConfig = getNetworkConfig(depositData.netId);
    const contract = getInstanceContractAddress(networkConfig, depositData.amount);
    const relayerUrl = getRelayerUrl(depositData.netId, relayer);
    return (
      await fetch(`${relayerUrl}/v1/tornadoWithdraw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contract, proof, args }),
      })
    ).json();
  },

  getRelayerJobStatus: async (netId, relayer, jobId) => {
    const relayerUrl = getRelayerUrl(netId, relayer);
    return (await fetch(`${relayerUrl}/v1/jobs/${jobId}`)).json();
  },

  getWithdrawalData: async depositData => {
    if (!depositData.isSpent) {
      return null;
    }
    const networkConfig = getNetworkConfig(depositData.netId);
    const contractAddress = getInstanceContractAddress(networkConfig, depositData.amount);
    const withdrawal = await loadWithdrawalByNullifier(
      depositData.netId,
      contractAddress,
      depositData.depositParams.nullifierHex.replace(/0x/, ''),
      depositData.deposit.blockNumber,
    );
    const withdrawalBlock = await Web3API.getBlock(withdrawal.blockNumber);

    return {
      withdrawal,
      withdrawalBlock,
    };
  },
};
