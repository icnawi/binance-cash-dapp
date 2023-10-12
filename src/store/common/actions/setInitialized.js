import { action } from 'easy-peasy';

export const setInitialized = action((state, payload) => {
    state.user.isInitialized = !!payload;
});
