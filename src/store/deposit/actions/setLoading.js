import { action } from 'easy-peasy';

export const setLoading = action((state, { isLoading }) => {
	state.isLoading = isLoading;
});
