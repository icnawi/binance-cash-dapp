import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { saveFile } from '../../../../../../utils';
import { Loader } from '../../../../loader/loader.jsx';
import { CopyButton } from '../../../copy-button/copy-button.jsx';
import { Modal } from '../../../modal/modal.jsx';

// const styles = ({ colors }) => ({
//   checkbox: {
//     color: colors.PRIMARY,
//   },
//   checkboxLabel: {
//     margin: '.5rem 0',
//   },
//   copyButton: {
//     fontSize: '10px',
//     marginLeft: 8,
//     minWidth: 18,
//     padding: '4px 0',
//     width: 18,
//   },
//   copyIcon: {
//     fontSize: '10px',
//   },
//   note: {
//     margin: '1rem 0',
//     wordBreak: 'break-all',
//   },
//   submitButton: {
//     fontSize: 14,
//     width: '100%',
//   },
// });

export const SubmitDepositModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false);
  const [backupChecked, setBackupChecked] = useState(false);
  const network = useStoreState(state => state.common.user.network);
  const depositAmount = useStoreState(state => state.deposit.depositAmount);
  const note = useStoreState(state => state.deposit.deposit?.note);
  const createDeposit = useStoreActions(actions => actions.deposit.createDeposit);
  const sendDeposit = useStoreActions(actions => actions.deposit.onSendDeposit);
  const fileName = `backup-${note?.slice(0, 33)}.txt`;

  useEffect(() => {
    if (open) {
      createDeposit({ depositAmount, network });
      setBackupChecked(false);
    }
  }, [open, createDeposit, depositAmount, network]);

  useEffect(() => {
    let timeoutId;

    if (note && open) {
      timeoutId = setTimeout(() => {
        saveFile(note, fileName);
      }, 500);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [open, note, fileName]);

  const toggleBackupCheckbox = useCallback(
    () => setBackupChecked(!backupChecked),
    [setBackupChecked, backupChecked],
  );

  const submit = async () => {
    setLoading(true);
    await sendDeposit({ network });
    setLoading(false);
    onClose();
  };

  return (
    <Modal open={open && !!note} onClose={onClose} title="Your note" top>
      <Typography>{t('backupNoteMessage')}</Typography>
      <Typography>{t('treatNoteAsKeyMessage')}</Typography>
      <Typography className={classes.note} color="primary">
        {note}
        <CopyButton
          variant="contained"
          color="primary"
          className={classes.copyButton}
          textToCopy={note}>
          <FileCopy className={classes.copyIcon} />
        </CopyButton>
      </Typography>
      <Typography>
        {t('askToSaveNote')}&nbsp;
        <Typography color="primary" display="inline">
          {fileName}
        </Typography>
      </Typography>

      <FormControlLabel
        className={classes.checkboxLabel}
        control={
          <Checkbox
            className={classes.checkbox}
            checked={backupChecked}
            onChange={toggleBackupCheckbox}
            name="backup"
            icon={<CheckBoxOutlineBlankOutlined />}
            checkedIcon={<CheckBoxOutlined />}
            color="primary"
          />
        }
        label={t('backedUpNoteConfirm')}
      />
      <Button
        type="button"
        variant="contained"
        color="primary"
        size="large"
        className={classes.submitButton}
        disabled={!backupChecked}
        disableFocusRipple
        disableRipple
        disableTouchRipples
        onClick={submit}>
        {t('sendDeposit')}
      </Button>
      {isLoading ? <Loader type="tornado">{t('confirmTransaction')}</Loader> : ''}
    </Modal>
  );
};
