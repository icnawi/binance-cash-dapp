import { initState } from './initState';
import { actions } from './actions';
import { thunks } from './thunks';

export const withdraw = {
    ...initState,
    ...actions,
    ...thunks,
};
