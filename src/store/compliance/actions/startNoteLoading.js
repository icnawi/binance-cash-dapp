import { action } from 'easy-peasy';

export const startNoteLoading = action((state) => {
    state.isNoteLoading = true;
});
