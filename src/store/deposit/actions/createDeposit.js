import { action } from 'easy-peasy';
import { API } from '../../../binance';

export const createDeposit = action((state, payload) => {
	state.deposit = API.tornado.createDeposit(payload.depositAmount, payload.network);
});
