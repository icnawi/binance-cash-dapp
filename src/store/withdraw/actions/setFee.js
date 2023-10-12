import { action } from 'easy-peasy';

export const setFee = action((state, payload) => {
    state.walletFee = payload.walletFee;
    state.relayerFee = payload.relayerFee;
});
