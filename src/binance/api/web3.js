import Web3 from 'web3';

let web3;
let web3Metamask;
let ethereum;

export const Web3API = {
  init: async rpcUrl => {
    web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

    if (window.web3) {
      web3Metamask = new Web3(window.web3.currentProvider);
      ethereum = window.ethereum;
      [web3Metamask.eth.defaultAccount] = await web3Metamask.eth.getAccounts();
    }
  },

  changeRpcUrl: rpcUrl => {
    web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
  },

  isInstalled: () => {
    return !!window.web3?.currentProvider;
  },

  isConnected: () => {
    return !!web3Metamask?.eth.defaultAccount;
  },

  getNetwork: () => {
    return ethereum?.networkVersion;
  },

  getAccount: () => {
    return web3Metamask?.eth.defaultAccount;
  },

  connect: async () => {
    if (Web3API.isInstalled()) {
      try {
        await ethereum.enable();
        [web3Metamask.eth.defaultAccount] = await web3Metamask.eth.getAccounts();
        return true;
      } catch (err) {
        return false;
      }
    }

    return false;
  },

  onNetworkChange: handleNetworkChange => {
    ethereum?.on('networkChanged', handleNetworkChange);
  },

  getContract: (contractJson, address) => {
    return web3?.eth ? new web3.eth.Contract(contractJson, address) : undefined;
  },

  getContractMetamask: (contractJson, address) => {
    return web3Metamask?.eth ? new web3Metamask.eth.Contract(contractJson, address) : undefined;
  },

  getBlockNumber: () => {
    return web3?.eth.getBlockNumber();
  },

  getGasPrice: async (type = 'standard') => {
    const gasPriceMap = await (await fetch('https://www.etherchain.org/api/gasPriceOracle')).json();
    return (gasPriceMap.currentBaseFee + (gasPriceMap[type] || gasPriceMap.standard)) * 1e9;
  },

  getTransactionReceipt: txHash => {
    return web3?.eth.getTransactionReceipt(txHash);
  },

  getBlock: blockNumber => {
    return web3?.eth.getBlock(blockNumber);
  },

  getRpcNetwork: async rpcUrl => {
    const res = await (
      await fetch(rpcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 1,
          jsonrpc: '2.0',
          method: 'net_version',
          params: [],
        }),
      })
    ).json();

    return res.result;
  },
};
