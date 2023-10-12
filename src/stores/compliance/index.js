import { initState } from './state-tree.js';
import { API } from '../../binance/index.js';
import { i18n } from '../../i18n/index.js';

export const complianceSlice = (set, get) => ({
  ...initState,
  resetState: () => set(initState),
  setNote: payload =>
    set(state => ({
      ...state.note,
      note: payload,
    })),
  setDepositData: payload =>
    set(state => ({
      ...state.depositData,
      depositData: payload,
    })),
  startNoteLoading: () =>
    set(state => ({
      ...state.isNoteLoading,
      isNoteLoading: true,
    })),
  stopNoteLoading: () =>
    set(state => ({
      ...state.isNoteLoading,
      isNoteLoading: false,
    })),
  setNoteError: payload =>
    set(state => ({
      ...state.noteError,
      noteError: payload,
    })),
  setWithdrawalData: payload =>
    set(state => ({
      ...state.withdrawalData,
      withdrawalData: payload,
    })),

  onParseNote: async payload => {
    get().resetState();

    if (!payload || !payload.note) {
      return;
    }

    get().startNoteLoading();
    get().setNote(payload.note);

    try {
      const depositData = await API.tornado.parseNote(payload.note, payload.netId, false);
      const withdrawalData = await API.tornado.getWithdrawalData(depositData);
      get().setDepositData(depositData);
      get().setWithdrawalData(withdrawalData);
    } catch (err) {
      get().setNoteError(err.noteError || i18n.t('invalidNoteError'));
    }

    get().stopNoteLoading();
  },
});
