import { action } from 'easy-peasy';

export const setNoteError = action((state, payload) => {
    state.noteError = payload;
});
