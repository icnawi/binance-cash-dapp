import { thunk } from 'easy-peasy';
import { API } from '../../../binance';

export const onGenerateProof = thunk(async (actions, payload, { getState }) => {
    actions.startProofLoading();

    setTimeout(async () => {
        const state = getState();
        const fee = state.useWallet ? state.walletFee?.total : state.relayerFee?.total;

        try {
            const proof = await API.tornado.getProof(state.depositData, fee, payload, state.relayer, state.useWallet);
            actions.setProof(proof);
        } catch (err) {
            console.error(err);
        }

        actions.stopProofLoading();
    }, 200);
});
