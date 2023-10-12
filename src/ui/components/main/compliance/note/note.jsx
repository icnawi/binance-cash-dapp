import { useTranslation } from 'react-i18next';

// import { TextField } from '../../../common/text-field/text-field.jsx';
import { Loader } from '../../../loader/loader.jsx';

export const Note = ({ control }) => {
  const { t } = useTranslation();
  const netId = useStoreState(state => state.common.user.network);
  const isNoteLoading = useStoreState(state => state.compliance.isNoteLoading);
  const noteError = useStoreState(state => state.compliance.noteError);

  const parseNote = useStoreActions(actions => actions.compliance.onParseNote);

  const handleChange = note => parseNote({ note, netId });

  // TODO: Refactor Textfield component
  return (
    <>
      {/*<TextField*/}
      {/*  name="note"*/}
      {/*  variant="outlined"*/}
      {/*  control={control}*/}
      {/*  label={t('note')}*/}
      {/*  placeholder={t('enterNotePlaceholder')}*/}
      {/*  fullWidth*/}
      {/*  classes={classes}*/}
      {/*  onChange={handleChange}*/}
      {/*  error={!!noteError}*/}
      {/*  helperText={noteError}*/}
      {/*/>*/}
      {isNoteLoading ? <Loader type="tornado">{t('gettingNoteData')}</Loader> : ''}
    </>
  );
};
