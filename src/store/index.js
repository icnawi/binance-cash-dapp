import { createStore } from 'easy-peasy';
import { actions } from './actions';
import { common } from './common';
import { deposit } from './deposit';
import { withdraw } from './withdraw';
import { statistics } from './statistics';
import { compliance } from './compliance';

export const store = createStore(
	{
		...actions,
		common,
		deposit,
		statistics,
		withdraw,
        compliance,
	},
	{ name: 'BinanceCash' }
);
