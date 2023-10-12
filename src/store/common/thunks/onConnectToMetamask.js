import { thunk } from 'easy-peasy';
import { API } from '../../../binance';

export const onConnectToMetamask = thunk(async (actions, payload, { getState }) => {
    const state = getState();

    await API.web3.init(state.settings.rpcUrl);

    actions.setInitialized(true);
    actions.setInstalled(API.web3.isInstalled());
    actions.setMetamaskNetwork(API.web3.getNetwork());

    API.web3.onNetworkChange(networkId => {
        actions.setMetamaskNetwork(networkId);
    });

    if (!API.web3.isConnected()) {
        actions.setIsConnected(false);
    }
});
