import { initState } from './state-tree.js';
import { API } from '../../binance/index.js';
import { LocalStorageKeys } from '../../ui/config/index.js';
import { getFromLS, getNetworkConfig, getTokenConfig, setToLS } from '../../utils/index.js';

const settingsFromStorage = getFromLS(LocalStorageKeys.SETTINGS, {});

export const commonSlice = (set, get) => ({
  ...initState,
  setInitialized: payload => set(state => ({ user: { ...state.user, isInitialized: !!payload } })),
  setInstalled: payload => set(state => ({ user: { ...state.user, isInstalled: !!payload } })),
  setConnected: payload => {
    // TODO: add settings to async store
    return set(state => ({
      ...state.user,
      isConnected: !!payload,
    }));
  },
  setMetamaskNetwork: payload =>
    set(state => ({ user: { ...state.user, metaMaskNetwork: !!payload } })),
  setNetwork: payload => {
    const tokenConfig = getTokenConfig(payload);
    const networkConfig = getNetworkConfig(payload);
    const updatedSettings = settingsFromStorage[`netId-${payload}`] || {
      rpcUrl: networkConfig.rpcEndpoints[0].url,
      rpcName: networkConfig.rpcEndpoints[0].name,
    };
    API.web3.changeRpcUrl(updatedSettings.rpcUrl);
    // TODO: replace with IndexedDb Solution
    setToLS(LocalStorageKeys.NETWORK, payload);
    return set(state => ({
      user: {
        ...state.user,
        network: payload,
      },
      settings: {
        ...state.settings,
        settings: updatedSettings,
      },
      networkConfig: {
        ...state.networkConfig,
        networkConfig,
      },
      tokenConfig: {
        ...state.tokenConfig,
        tokenConfig,
      },
    }));
  },
  updateSettings: payload =>
    set(state => {
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

      return {
        settings: {
          ...state.settings,
          settings: updatedSettings,
        },
      };
    }),
  setUserIpInfo: payload => set(state => ({ user: { ...state.user, ipInfo: !!payload } })),
  onChangeToken: async payload => {
    const networkConfig = getNetworkConfig(payload);

    get().setNetwork(payload);
  },
  onConnectToMetamask: async payload => {
    await API.web3.init(get().settings.rpcUrl);

    get().setInitialized(true);
    get().setInstalled(API.web3.isInstalled());
    get().setMetamaskNetwork(API.web3.getNetwork());

    API.web3.onNetworkChange(networkId => {
      get().setMetamaskNetwork(networkId);
    });

    if (!API.web3.isConnected()) {
      get().setIsConnected(false);
    }
  },
  onEstablishConnection: async payload => {
    if (await API.web3.connect()) {
      get().setIsConnected(true);
    }
  },
  onGetUserIpInfo: async payload => {
    const ipInfo = await (await fetch('https://api64.ipify.org?format=json')).json();
    get().setUserIpInfo(ipInfo);
  },
});
