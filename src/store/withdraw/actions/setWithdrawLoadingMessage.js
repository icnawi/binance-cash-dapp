import { action } from 'easy-peasy';

export const setWithdrawLoadingMessage = action((state, payload) => {
    state.withdrawLoadingMessage = payload;
});
