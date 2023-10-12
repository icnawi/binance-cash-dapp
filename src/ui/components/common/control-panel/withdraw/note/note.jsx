import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useStyles } from './Note.styles';
import { formatDateDiff, formatSubsequentDeposits } from '../../../../../../utils';
import { Loader } from '../../../../loader/loader.jsx';
import { Modal } from '../../../modal/modal.jsx';
import { TextField } from '../../../text-field/text-field.jsx';
import { Tooltip } from '../../../tooltip/tooltip.jsx';
import { WithdrawalSettings } from '../withdrawal-settings/withdrawal-settings.jsx';

export const Note = ({ control, hasError }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const netId = useStoreState(state => state.common.user.network);
  const token = useStoreState(state => state.common.tokenConfig.token);
  const noteError = useStoreState(state => state.withdraw.noteError);
  const isNoteLoading = useStoreState(state => state.withdraw.isNoteLoading);
  const depositData = useStoreState(state => state.withdraw.depositData);
  const isNoteLoaded = !!depositData && !noteError;

  const parseNote = useStoreActions(actions => actions.withdraw.onParseNote);

  const openSettings = () => setSettingsOpen(true);
  const closeSettings = () => setSettingsOpen(false);

  const handleChange = note => parseNote({ note, netId });

  return (
    <div className={classes.field}>
      <div className={classes.labelWrapper}>
        <div className={classes.labelContainer}>
          <span className={classes.label}>{t('note')}</span>
          <Tooltip placement="right" title={t('enterNoteTooltip')} width={180} />
        </div>
        <div>
          {isNoteLoaded && (
            <Tooltip placement="right" title={t('withdrawalSettings')}>
              <TuneIcon className={classes.optionIcon} onClick={openSettings} />
            </Tooltip>
          )}
        </div>
      </div>
      <TextField
        control={control}
        name="note"
        variant="outlined"
        placeholder={t('enterNotePlaceholder')}
        fullWidth
        classes={classes}
        error={!!noteError || hasError}
        helperText={noteError}
        onChange={handleChange}
      />
      {isNoteLoaded && (
        <div className={classes.noteInfoContainer}>
          <div className={classes.noteRow}>
            <span>{t('amount')}</span>
            <span className={classes.rowValue}>
              {depositData.amount} {token}
            </span>
          </div>
          <div className={classes.noteRow}>
            <span>{t('timePassed')}</span>
            <span className={classes.rowValue}>{formatDateDiff(depositData.timeStamp)}</span>
          </div>
          <div className={classes.noteRow}>
            <span>{t('subsequentDeposits')}</span>
            <span className={classes.rowValue}>
              {formatSubsequentDeposits(depositData.subsequentDeposits)}
            </span>
          </div>
        </div>
      )}
      {isNoteLoading ? <Loader type="tornado">{t('gettingNoteData')}</Loader> : ''}
      <Modal
        open={isNoteLoaded && isSettingsOpen}
        title={t('withdrawalSettings')}
        onClose={closeSettings}
        top>
        <WithdrawalSettings onSave={closeSettings} />
      </Modal>
    </div>
  );
};
