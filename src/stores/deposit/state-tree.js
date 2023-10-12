import { getNetworkConfig } from '../../utils/index.js';

const networkConfig = getNetworkConfig();

export const initState = {
  depositAmount: Number(networkConfig.amounts[0].amount),
  deposit: null,
  transactions: [],
  isLoading: false,
};
