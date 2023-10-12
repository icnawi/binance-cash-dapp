import { action } from 'easy-peasy';

export const setWithdrawalData = action((state, payload) => {
    state.withdrawalData = payload;
});
