import { thunk } from 'easy-peasy';
import { API } from '../../../binance';

export const onSaveWithdrawalSettings = thunk(async (actions, payload, { getState }) => {
    const state = getState();

    actions.setUseWallet(payload.useWallet);
    actions.setRelayer(payload.relayer);

    const fee = await API.tornado.getFee(Number(state.depositData.amount), state.depositData.netId, payload.relayer);
    actions.setFee(fee);
});
