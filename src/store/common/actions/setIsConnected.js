import { action } from 'easy-peasy';
import { LocalStorageKeys } from '../../../ui/config';
import { removeFromLS, setToLS } from '../../../utils';

export const setIsConnected = action((state, payload) => {
  if (payload) {
    setToLS(LocalStorageKeys.METAMASK_CONNECTED, payload);
  } else {
    removeFromLS(LocalStorageKeys.METAMASK_CONNECTED);
  }

  state.user.isConnected = !!payload;
});
