import { thunk } from 'easy-peasy';
import { API } from '../../../binance';

export const onLoadStatistics = thunk(async (actions, payload, { getStoreState }) => {
	actions.startLoading();
	const { total, deposits } = await API.tornado.getLatestDeposits(payload.network, payload.depositAmount);
	const state = getStoreState();

	if (Number(state.common.user.network) === Number(payload.network)) {
        if (deposits?.length === 0) {
            actions.setDepositNumber(0);
            actions.setLatestDeposits([]);
            actions.stopLoading();
        } else if (deposits) {
            actions.setDepositNumber(total);
            actions.setLatestDeposits(deposits.map((deposit, index) => ({
                number: total - index,
                timestamp: Number(deposit.timeStamp) * 1000,
            })));
            actions.stopLoading();
        }
    }
});
