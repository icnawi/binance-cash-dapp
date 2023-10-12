import { action } from 'easy-peasy';

export const startLoading = action((state) => {
	state.isLoading = true;
});
