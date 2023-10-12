import { thunk } from 'easy-peasy';
import { API } from '../../../binance';
import { i18n } from '../../../i18n';

export const onParseNote = thunk(async (actions, payload, { getState }) => {
    const state = getState();
    actions.resetState();

    if (!payload || !payload.note) {
        return;
    }

    actions.startNoteLoading();
    actions.setNote(payload.note);

    try {
        const depositData = await API.tornado.parseNote(payload.note, payload.netId, true);
        actions.setDepositData(depositData);

        const fee = await API.tornado.getFee(Number(depositData.amount), depositData.netId, state.relayer);
        actions.setFee(fee);
    } catch (err) {
        actions.setNoteError(err.noteError || i18n.t('invalidNoteError'));
    }

    actions.stopNoteLoading();
});
