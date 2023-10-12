import { action } from 'easy-peasy';
import { getFromLS, setToLS } from '../../../utils';
import { LocalStorageKeys } from '../../../ui/config';

export const updateTransaction = action((state, payload) => {
  state.transactions = state.transactions.map(transaction => {
    return transaction.transactionHash === payload.transactionHash
      ? { ...transaction, ...payload.data }
      : transaction;
  });
  const transactionsFromStorage = getFromLS(LocalStorageKeys.TRANSACTIONS, {});
  transactionsFromStorage[`netId-${payload.network}`] = state.transactions;
  setToLS(LocalStorageKeys.TRANSACTIONS, transactionsFromStorage);
});
