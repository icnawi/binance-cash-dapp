import { onConnectToMetamask } from './onConnectToMetamask';
import { onEstablishConnection } from './onEstablishConnection';
import { onGetUserIpInfo } from './onGetUserIpInfo';
import { onChangeToken } from './onChangeToken';

export const thunks = {
    onChangeToken,
    onConnectToMetamask,
    onEstablishConnection,
    onGetUserIpInfo,
};
