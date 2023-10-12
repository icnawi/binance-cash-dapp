import { LocalStorageKeys } from '../../ui/config';
import { getFromLS, getNetworkConfig, getTokenConfig } from '../../utils';

const tokenConfig = getTokenConfig();
const networkConfig = getNetworkConfig();
const settingsFromStorage = getFromLS(LocalStorageKeys.SETTINGS, {});

export const initState = {
  isLoading: false,
  // error: {
  // 	isError: false,
  // 	description: '',
  // },
  user: {
    isInstalled: false,
    isConnected: !!getFromLS(LocalStorageKeys.METAMASK_CONNECTED),
    isInitialized: false,
    ipInfo: {},
    network: Number(networkConfig.netId),
    metaMaskNetwork: null,
  },

  tokenConfig,
  networkConfig,
  settings: settingsFromStorage[`netId-${networkConfig.netId}`] || {
    rpcUrl: networkConfig.rpcEndpoints[0].url,
    rpcName: networkConfig.rpcEndpoints[0].name,
  },
};
