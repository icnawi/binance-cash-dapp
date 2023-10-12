import { action } from 'easy-peasy';
import { LocalStorageKeys } from '../../../ui/config';
import { API } from '../../../binance';
import { getFromLS, setToLS } from '../../../utils';

export const updateSettings = action((state, payload) => {
  const updatedSettings = {
    ...state.settings,
    ...payload,
  };

  const settingsFromStorage = getFromLS(LocalStorageKeys.SETTINGS, {});
  settingsFromStorage[`netId-${state.user.network}`] = updatedSettings;
  setToLS(LocalStorageKeys.SETTINGS, settingsFromStorage);

  if (payload.rpcUrl) {
    API.web3.changeRpcUrl(payload.url);
  }

  state.settings = updatedSettings;
});
