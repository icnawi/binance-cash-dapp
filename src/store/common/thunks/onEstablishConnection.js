import { thunk } from 'easy-peasy';
import { API } from '../../../binance';

export const onEstablishConnection = thunk(async actions => {
	if (await API.web3.connect()) {
		actions.setIsConnected(true);
	}
});
