import { action } from 'easy-peasy';

export const setProof = action((state, payload) => {
    state.proof = payload;
});
