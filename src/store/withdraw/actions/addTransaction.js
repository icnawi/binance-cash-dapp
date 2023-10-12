import { action } from 'easy-peasy';

export const addTransaction = action((state, payload) => {
    state.transactions.unshift(payload);
});
