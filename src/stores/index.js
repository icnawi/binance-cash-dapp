import { persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

import { commonSlice } from './common/index.js';
import { initState as common } from './common/state-tree.js';
import { depositSlice } from './deposit/index.js';
import { initState as deposit } from './deposit/state-tree.js';
import { statisticsSlice } from './statistics/index.js';
import { withdrawSlice } from './withdraw/index.js';

export const useAppStore = createStore(
  persist(
    (...[set, get]) => ({
      reset: () => set(state => ({ ...state, common, deposit })),
      ...commonSlice(set, get),
      ...depositSlice(set, get),
      ...statisticsSlice(set, get),
      ...withdrawSlice(set, get),
    }),
    { name: 'BinanceCash' },
  ),
);
