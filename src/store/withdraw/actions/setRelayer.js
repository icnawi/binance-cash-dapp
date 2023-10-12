import { action } from 'easy-peasy';

export const setRelayer = action((state, payload) => {
    state.relayer = payload;
});
