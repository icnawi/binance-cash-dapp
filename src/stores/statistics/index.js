import { initState } from './state-free.js';
import { API } from '../../binance/index.js';

export const statisticsSlice = (set, get) => ({
  ...initState,
  startLoading: () => set(state => ({ ...state.isLoading, isLoading: true })),
  stopLoading: () => set(state => ({ ...state.isLoading, isLoading: false })),
  setLatestDeposits: payload =>
    set(state => ({ ...state.latestDeposits, latestDeposits: payload })),
  setDepositNumber: payload =>
    set(state => ({
      ...state.depositNumber,
      depositNumber: payload,
    })),
  onLoadStatistics: async payload => {
    get().startLoading();
    const { total, deposits } = await API.tornado.getLatestDeposits(
      payload.network,
      payload.depositAmount,
    );

    if (Number(get().common.user.network) === Number(payload.network)) {
      if (deposits?.length === 0) {
        get().setDepositNumber(0);
        get().setLatestDeposits([]);
        get().stopLoading();
      } else if (deposits) {
        get().setDepositNumber(total);
        get().setLatestDeposits(
          deposits.map((deposit, index) => ({
            number: total - index,
            timestamp: Number(deposit.timeStamp) * 1000,
          })),
        );
        get().stopLoading();
      }
    }
  },
});
