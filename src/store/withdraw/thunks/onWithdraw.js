import { thunk } from 'easy-peasy';

import { API } from '../../../binance';
import { i18n } from '../../../i18n';
import { TxStatus } from '../../../ui/config';

export const onWithdraw = thunk(async (_, payload, { getState, getStoreActions }) => {
  const state = getState();
  const storeActions = getStoreActions();
  const { depositData } = state;

  storeActions.withdraw.setWithdrawLoadingMessage(i18n.t('preparingTransaction'));

  if (state.useWallet) {
    API.tornado
      .withdrawByWallet(depositData, state.proof.proof, state.proof.args)
      .on('error', (error, transaction) => {
        if (transaction) {
          storeActions.withdraw.updateTransaction({
            transactionHash: transaction.transactionHash,
            data: { status: 'failed' },
          });
        }
        storeActions.withdraw.setWithdrawLoadingMessage(null);
      })
      .on('transactionHash', transactionHash => {
        storeActions.withdraw.addTransaction({
          amount: Number(depositData.amount),
          status: 'loading',
          transactionHash,
          showNotification: true,
        });
        storeActions.withdraw.setWithdrawLoadingMessage(null);
        storeActions.withdraw.setNote(null);
        storeActions.withdraw.setDepositData(null);
        storeActions.withdraw.setFee({});
      })
      .on('receipt', ({ transactionHash }) => {
        storeActions.withdraw.updateTransaction({ transactionHash, data: { status: 'success' } });
        storeActions.withdraw.setWithdrawLoadingMessage(null);
        storeActions.deposit.onGetTxs();
      });

    storeActions.withdraw.setWithdrawLoadingMessage(i18n.t('confirmTransaction'));
  } else {
    const { id } = await API.tornado.withdrawByRelayer(
      depositData,
      state.proof.proof,
      state.proof.args,
      state.relayer,
    );

    // Update withdraw status every 10 seconds
    let withdrawStatus;
    const intervalId = setInterval(async () => {
      if (!withdrawStatus) {
        storeActions.withdraw.addTransaction({
          id,
          amount: Number(depositData.amount),
          status: 'loading',
          showNotification: true,
        });

        storeActions.withdraw.setWithdrawLoadingMessage(null);
        storeActions.withdraw.setNote(null);
        storeActions.withdraw.setDepositData(null);
        storeActions.withdraw.setFee({});
      }

      withdrawStatus = await API.tornado.getRelayerJobStatus(depositData.netId, state.relayer, id);

      switch (withdrawStatus.status) {
        case 'ACCEPTED':
          storeActions.deposit.updateTransaction({
            transactionHash: depositData.deposit.transactionHash,
            data: {
              txStatus: TxStatus.ACCEPTED,
            },
          });
          storeActions.withdraw.updateTransaction({
            id,
            data: { transactionHash: withdrawStatus.txHash },
          });
          break;

        case 'SENT':
          storeActions.deposit.updateTransaction({
            transactionHash: depositData.deposit.transactionHash,
            data: {
              txStatus: TxStatus.SENT,
            },
          });
          storeActions.withdraw.updateTransaction({
            id,
            data: { transactionHash: withdrawStatus.txHash },
          });
          break;

        case 'MINED':
          storeActions.deposit.updateTransaction({
            transactionHash: depositData.deposit.transactionHash,
            data: {
              txStatus: TxStatus.MINED,
            },
          });
          storeActions.withdraw.updateTransaction({
            id,
            data: { transactionHash: withdrawStatus.txHash },
          });
          break;

        case 'CONFIRMED':
          storeActions.withdraw.updateTransaction({
            id,
            data: { transactionHash: withdrawStatus.txHash, status: 'success' },
          });
          storeActions.deposit.onGetTxs();
          clearInterval(intervalId);
          break;

        case 'FAILED':
          storeActions.withdraw.updateTransaction({
            id,
            data: { transactionHash: withdrawStatus.txHash, status: 'failed' },
          });
          clearInterval(intervalId);
          break;

        default:
          storeActions.withdraw.updateTransaction({
            id,
            data: { transactionHash: withdrawStatus.txHash },
          });
          break;
      }
    }, 10000);

    storeActions.withdraw.setWithdrawLoadingMessage(i18n.t('relayerSending'));
  }
});
