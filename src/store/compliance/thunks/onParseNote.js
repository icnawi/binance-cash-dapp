import { thunk } from 'easy-peasy';
import { API } from '../../../binance';
import { i18n } from '../../../i18n';

export const onParseNote = thunk(async (actions, payload) => {
    actions.resetState();

    if (!payload || !payload.note) {
        return;
    }

    actions.startNoteLoading();
    actions.setNote(payload.note);

    try {
        const depositData = await API.tornado.parseNote(payload.note, payload.netId, false);
        const withdrawalData = await API.tornado.getWithdrawalData(depositData);
        actions.setDepositData(depositData);
        actions.setWithdrawalData(withdrawalData);
    } catch (err) {
        actions.setNoteError(err.noteError || i18n.t('invalidNoteError'));
    }

    actions.stopNoteLoading();
});
