import { action } from 'easy-peasy';

export const setUserIpInfo = action((state, payload) => {
    state.user.ipInfo = payload;
});
