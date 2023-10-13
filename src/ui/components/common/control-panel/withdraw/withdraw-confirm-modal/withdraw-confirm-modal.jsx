import { useTranslation } from 'react-i18next';

import { Modal } from '../../../modal/modal.jsx';

// const styles = {
//   confirmButton: {
//     fontSize: 14,
//     marginTop: 20,
//     width: '100%',
//   },
// };

export const WithdrawConfirmModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const proof = useStoreState(state => state.withdraw.proof);
  const withdraw = useStoreActions(actions => actions.withdraw.onWithdraw);

  const confirm = () => {
    withdraw();
    onClose();
  };

  return (
    <Modal open={open && !!proof} onClose={onClose} title={t('withdrawalConfirmation')}>
      {t('zkProofGenerated')}
      <Button
        type="button"
        variant="contained"
        color="primary"
        size="large"
        className={classes.confirmButton}
        disableFocusRipple
        disableRipple
        disableTouchRipples
        onClick={confirm}>
        {t('confirm')}
      </Button>
    </Modal>
  );
};
