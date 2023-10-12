import { thunk } from 'easy-peasy';
import { v4 as uuid } from 'uuid';
import { API } from '../../../binance';
import { TxStatus } from '../../../ui/config';

export const onSendDeposit = thunk(async (actions, payload, { getState }) => {
  const state = getState();
  return new Promise(resolve => {
    API.tornado
      .deposit(payload.network, +state.depositAmount, state.deposit?.commitmentHex)
      .on('error', (error, transaction) => {
        if (transaction) {
          actions.updateTransaction({
            transactionHash: transaction.transactionHash,
            network: payload.network,
            data: { status: 'failed', txStatus: TxStatus.FAILED },
          });
        }
        resolve();
      })
      .on('transactionHash', async transactionHash => {
        const { total } = await API.tornado.getLatestDeposits(
          payload.network,
          state.depositAmount,
          1,
        );
        actions.addTransaction({
          id: uuid(),
          timestamp: Date.now(),
          amount: +state.depositAmount,
          nullifierHex: state.deposit?.nullifierHex,
          status: 'loading',
          txStatus: TxStatus.WAITING_FOR_RECEIPT,
          index: total + 1,
          transactionHash,
          showNotification: true,
          note: state.deposit.note,
          network: payload.network,
        });
        actions.setLoading({ isLoading: true });
        resolve();
      })
      .on('receipt', async ({ transactionHash }) => {
        actions.updateTransaction({
          transactionHash,
          network: payload.network,
          data: {
            status: 'success',
            txStatus: TxStatus.DEPOSITED,
          },
        });
        actions.setLoading({ isLoading: false });

        // Close notification (toaster) 5 seconds after success
        setTimeout(() => {
          actions.updateTransaction({
            transactionHash,
            network: payload.network,
            data: {
              showNotification: false,
            },
          });
        }, 5000);
      });
  });
});
