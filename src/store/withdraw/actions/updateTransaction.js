import { action } from 'easy-peasy';

export const updateTransaction = action((state, payload) => {
  state.transactions = state.transactions.map(transaction => {
    return transaction.transactionHash === payload.transactionHash || transaction.id === payload.id
      ? { ...transaction, ...payload.data }
      : transaction;
  });
});
