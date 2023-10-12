import { action } from 'easy-peasy';

export const stopLoading = action((state) => {
	state.isLoading = false;
});
