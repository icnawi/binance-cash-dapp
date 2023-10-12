import { action } from 'easy-peasy';

export const setInstalled = action((state, payload) => {
    state.user.isInstalled = !!payload;
});
