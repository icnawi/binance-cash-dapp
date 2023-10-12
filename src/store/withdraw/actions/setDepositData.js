import { action } from 'easy-peasy';

export const setDepositData = action((state, payload) => {
    state.depositData = payload;
});
