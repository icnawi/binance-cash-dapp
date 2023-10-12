import { thunk } from 'easy-peasy';
import { getNetworkConfig } from '../../../utils';

export const onChangeToken = thunk(async (actions, payload, { getStoreActions }) => {
    const storeActions = getStoreActions();
    const networkConfig = getNetworkConfig(payload);

    actions.setNetwork(payload);
    storeActions.deposit.setDepositAmount(Number(networkConfig.amounts[0].amount));
    await storeActions.deposit.onGetTxs();
});
