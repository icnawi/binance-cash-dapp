import { action } from 'easy-peasy';

export const setNote = action((state, payload) => {
    state.note = payload;
});
