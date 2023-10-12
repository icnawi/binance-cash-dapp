import { onParseNote } from './onParseNote';
import { onGenerateProof } from './onGenerateProof';
import { onSaveWithdrawalSettings } from './onSaveWithdrawalSettings';
import { onWithdraw } from './onWithdraw';

export const thunks = {
    onParseNote,
    onGenerateProof,
    onSaveWithdrawalSettings,
    onWithdraw,
};
