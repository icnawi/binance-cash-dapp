export const initState = {
    note: null,
    depositData: null,
    relayerFee: null,
    walletFee: null,
    isNoteLoading: false,
    isProofLoading: false,
    withdrawLoadingMessage: null,
    noteError: null,
    proof: null,
    relayer: {
        name: 'default',
        url: 'default',
    },
    useWallet: false,
    transactions: [],
};
