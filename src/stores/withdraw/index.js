import { initState } from './state-tree.js';
import { API } from '../../binance/index.js';
import { i18n } from '../../i18n/index.js';

export const withdrawSlice = (set, get) => ({
  ...initState,
  resetState: () => set(initState),
  resetWithdrawalSettings: () =>
    set({
      relayer: {
        name: 'default',
        url: 'default',
      },
      useWallet: false,
    }),
  setNote: payload => set({ note: payload }),
  setDepositData: payload => set({ depositData: payload }),
  setFee: ({ walletFee, relayerFee }) => set({ walletFee, relayerFee }),
  setUseWallet: payload => set({ useWallet: !!payload }),
  setRelayer: payload => set({ relayer: payload }),
  setProof: payload => set({ proof: payload }),
  startNoteLoading: () => set({ isNoteLoading: true }),
  stopNoteLoading: () => set({ isNoteLoading: false }),
  startProofLoading: () => set({ isProofLoading: true }),
  stopProofLoading: () => set({ isProofLoading: false }),
  setWithdrawLoadingMessage: payload => set({ withdrawLoadingMessage: payload }),
  setNoteError: payload => set({ noteError: payload }),
  addTransaction: payload =>
    set(state => ({ transactions: [...state.transactions, get().transactions.unshift(payload)] })),
  updateTransaction: payload =>
    set({
      transactions: get().transactions.map(transaction => {
        return transaction.transactionHash === payload.transactionHash ||
          transaction.id === payload.id
          ? { ...transaction, ...payload.data }
          : transaction;
      }),
    }),
  onParseNote: async payload => {
    get().resetState();

    if (!payload || !payload.note) {
      return;
    }

    get().startNoteLoading();
    get().setNote(payload.note);

    try {
      const depositData = await API.tornado.parseNote(payload.note, payload.netId, true);
      get().setDepositData(depositData);

      const fee = await API.tornado.getFee(
        Number(depositData.amount),
        depositData.netId,
        get().relayer,
      );
      get().setFee(fee);
    } catch (err) {
      get().setNoteError(err.noteError || i18n.t('invalidNoteError'));
    }

    get().stopNoteLoading();
  },
  onGenerateProof: async payload => {
    get().startProofLoading();

    setTimeout(async () => {
      const fee = get().useWallet ? get().walletFee?.total : get().relayerFee?.total;

      try {
        const proof = await API.tornado.getProof(
          get().depositData,
          fee,
          payload,
          get().relayer,
          get().useWallet,
        );
        get().setProof(proof);
      } catch (err) {
        console.error(err);
      }

      get().stopProofLoading();
    }, 200);
  },
  onSaveWithdrawalSettings: async payload => {
    get().setUseWallet(payload.useWallet);
    get().setRelayer(payload.relayer);

    const fee = await API.tornado.getFee(
      Number(get().depositData.amount),
      get().depositData.netId,
      payload.relayer,
    );
    get().setFee(fee);
  },
  onWithdraw: async payload => {
    get().setUseWallet(payload.useWallet);
    get().setRelayer(payload.relayer);

    const fee = await API.tornado.getFee(
      Number(get().depositData.amount),
      get().depositData.netId,
      payload.relayer,
    );
    get().setFee(fee);
  },
});
