import { action } from 'easy-peasy';

export const stopNoteLoading = action((state) => {
    state.isNoteLoading = false;
});
