import { action } from 'easy-peasy';

export const resetWithdrawalSettings = action((state) => {
    state.relayer = {
        name: 'default',
        url: 'default',
    };
    state.useWallet = false;
});
