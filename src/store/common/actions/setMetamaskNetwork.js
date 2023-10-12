import { action } from 'easy-peasy';

export const setMetamaskNetwork = action((state, payload) => {
    state.user.metaMaskNetwork = payload;
});
