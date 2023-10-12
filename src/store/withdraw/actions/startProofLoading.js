import { action } from 'easy-peasy';

export const startProofLoading = action((state) => {
    state.isProofLoading = true;
});
