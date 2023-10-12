import { action } from 'easy-peasy';

export const setDepositAmount = action((state, payload) => {
	state.depositAmount = payload;
});
