import { action } from 'easy-peasy';

export const setLatestDeposits = action((state, payload) => {
	state.latestDeposits = payload;
});
