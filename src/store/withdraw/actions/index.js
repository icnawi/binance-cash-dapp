import { resetState } from './resetState';
import { resetWithdrawalSettings } from './resetWithdrawalSettings';
import { setNote } from './setNote';
import { setDepositData } from './setDepositData';
import { setFee } from './setFee';
import { setUseWallet } from './setUseWallet';
import { setRelayer } from './setRelayer';
import { setProof } from './setProof';
import { startNoteLoading } from './startNoteLoading';
import { stopNoteLoading } from './stopNoteLoading';
import { startProofLoading } from './startProofLoading';
import { stopProofLoading } from './stopProofLoading';
import { setWithdrawLoadingMessage } from './setWithdrawLoadingMessage';
import { setNoteError } from './setNoteError';
import { addTransaction } from './addTransaction';
import { updateTransaction } from './updateTransaction';

export const actions = {
    resetState,
    resetWithdrawalSettings,
    setNote,
    setDepositData,
    setFee,
    setUseWallet,
    setRelayer,
    setProof,
    startNoteLoading,
    stopNoteLoading,
    startProofLoading,
    stopProofLoading,
    setWithdrawLoadingMessage,
    setNoteError,
    addTransaction,
    updateTransaction,
};
