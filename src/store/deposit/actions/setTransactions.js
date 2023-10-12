import { action } from 'easy-peasy';

export const setTransactions = action((state, payload) => {
    state.transactions = payload;
});
