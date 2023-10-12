import { action } from 'easy-peasy';

export const setDepositNumber = action((state, payload) => {
	state.depositNumber = payload;
});
