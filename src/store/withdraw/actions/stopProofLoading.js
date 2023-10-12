import { action } from 'easy-peasy';

export const stopProofLoading = action((state) => {
    state.isProofLoading = false;
});
