import { v4 as uuid } from 'uuid';

import { initState } from './state-tree.js';
import { API } from '../../binance/index.js';
import { LocalStorageKeys, TxStatus } from '../../ui/config/index.js';
import { getFromLS, setToLS } from '../../utils/index.js';

// TODO: replace some regular stuff with react-query
export const depositSlice = (set, get) => ({
  ...initState,
  setDepositAmount: payload =>
    set(state => ({
      ...state.depositAmount,
      depositAmount: payload,
    })),
  createDeposit: payload =>
    set(state => ({
      ...state.deposit,
      deposit: API.tornado.createDeposit(payload.depositAmount, payload.network),
    })),
  updateTransaction: payload =>
    set(state => ({
      ...state.depositAmount,
      depositAmount: payload,
    })),
  addTransaction: payload =>
    set(state => ({
      ...state.depositAmount,
      depositAmount: payload,
    })),
  setTransactions: payload =>
    set(state => ({
      ...state.depositAmount,
      depositAmount: payload,
    })),
  setLoading: payload =>
    set(state => ({
      ...state.depositAmount,
      depositAmount: payload,
    })),

  onSendDeposit: async payload =>
    new Promise(resolve => {
      API.tornado
        .deposit(payload.network, +get().depositAmount, get().deposit?.commitmentHex)
        .on('error', (error, transaction) => {
          if (transaction) {
            get().updateTransaction({
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
            get().depositAmount,
            1,
          );
          get().addTransaction({
            id: uuid(),
            timestamp: Date.now(),
            amount: +get().depositAmount,
            nullifierHex: get().deposit?.nullifierHex,
            status: 'loading',
            txStatus: TxStatus.WAITING_FOR_RECEIPT,
            index: total + 1,
            transactionHash,
            showNotification: true,
            note: get().deposit.note,
            network: payload.network,
          });
          get().setLoading({ isLoading: true });
          resolve();
        })
        .on('receipt', async ({ transactionHash }) => {
          get().updateTransaction({
            transactionHash,
            network: payload.network,
            data: {
              status: 'success',
              txStatus: TxStatus.DEPOSITED,
            },
          });
          get().setLoading({ isLoading: false });

          // Close notification (toaster) 5 seconds after success
          setTimeout(() => {
            get().updateTransaction({
              transactionHash,
              network: payload.network,
              data: {
                showNotification: false,
              },
            });
          }, 5000);
        });
    }),
  onGetTxs: async () => {
    const transactionsFromStorage = getFromLS(LocalStorageKeys.TRANSACTIONS, {});
    const netId = get().common.user.network;
    const transactions = transactionsFromStorage[`netId-${netId}`] || [];

    // Close all transaction notifications if loaded from LS for the first time
    if (!get().deposit.transactions?.length) {
      transactions.forEach(transaction => {
        transaction.showNotification = false;
      });
    }

    get().deposit.setTransactions(transactions);

    const txStatuses = await Promise.all(
      transactions.map(tx => API.tornado.getTransactionStatus(tx)),
    );
    txStatuses.forEach((txStatus, index) => {
      transactions[index].txStatus = txStatus;
    });
    get().deposit.setTransactions([...transactions]);

    transactionsFromStorage[`netId-${netId}`] = transactions;
    setToLS(LocalStorageKeys.TRANSACTIONS, transactionsFromStorage);
  },
});
