import { action } from 'easy-peasy';
import { initState as common } from '../common/initState';
import { initState as deposit } from '../deposit/initState';

export const resetState = action(state => ({ ...state, common, deposit }));
