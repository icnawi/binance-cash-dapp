import { thunk } from 'easy-peasy';
import { getFromLS, setToLS } from '../../../utils';
import { LocalStorageKeys } from '../../../ui/config';
import { API } from '../../../binance';

export const onGetTxs = thunk(async (_, __, { getStoreState, getStoreActions }) => {
  const transactionsFromStorage = getFromLS(LocalStorageKeys.TRANSACTIONS, {});
  const store = getStoreState();
  const actions = getStoreActions();
  const netId = store.common.user.network;
  const transactions = transactionsFromStorage[`netId-${netId}`] || [];

  // Close all transaction notifications if loaded from LS for the first time
  if (!store.deposit.transactions?.length) {
    transactions.forEach(transaction => {
      transaction.showNotification = false;
    });
  }

  actions.deposit.setTransactions(transactions);

  const txStatuses = await Promise.all(
    transactions.map(tx => API.tornado.getTransactionStatus(tx)),
  );
  txStatuses.forEach((txStatus, index) => {
    transactions[index].txStatus = txStatus;
  });
  actions.deposit.setTransactions([...transactions]);

  transactionsFromStorage[`netId-${netId}`] = transactions;
  setToLS(LocalStorageKeys.TRANSACTIONS, transactionsFromStorage);
});
