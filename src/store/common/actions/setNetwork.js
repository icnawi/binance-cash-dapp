import { action } from 'easy-peasy';
import { LocalStorageKeys } from '../../../ui/config';
import { getFromLS, getNetworkConfig, getTokenConfig, setToLS } from '../../../utils';
import { API } from '../../../binance';

export const setNetwork = action((state, payload) => {
  const tokenConfig = getTokenConfig(payload);
  const networkConfig = getNetworkConfig(payload);
  const settingsFromStorage = getFromLS(LocalStorageKeys.SETTINGS, {});
  const updatedSettings = settingsFromStorage[`netId-${payload}`] || {
    rpcUrl: networkConfig.rpcEndpoints[0].url,
    rpcName: networkConfig.rpcEndpoints[0].name,
  };
  API.web3.changeRpcUrl(updatedSettings.rpcUrl);
  setToLS(LocalStorageKeys.NETWORK, payload);
  state.user.network = payload;
  state.settings = updatedSettings;
  state.networkConfig = networkConfig;
  state.tokenConfig = tokenConfig;
});
