import { addTransaction } from './addTransaction';
import { createDeposit } from './createDeposit';
import { setDepositAmount } from './setDepositAmount';
import { setLoading } from './setLoading';
import { setTransactions } from './setTransactions';
import { updateTransaction } from './updateTransaction';

export const actions = {
  setDepositAmount,
  createDeposit,
  updateTransaction,
  addTransaction,
  setTransactions,
  setLoading,
};
