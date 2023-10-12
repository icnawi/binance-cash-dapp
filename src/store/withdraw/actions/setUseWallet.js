import { action } from 'easy-peasy';

export const setUseWallet = action((state, payload) => {
    state.useWallet = !!payload;
});
