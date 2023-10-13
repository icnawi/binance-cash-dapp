import React from 'react';
import { useTranslation } from 'react-i18next';

import { Amount } from './amount/amount.jsx';
import { DepositNotification } from './deposit-notification/deposit-notification.jsx';
import { SubmitDepositModal } from './submit-deposit-modal/submit-deposit-modal.jsx';
import { Token } from './token/token.jsx';
import { Connect } from '../../connect/connect.jsx';
import { Modal } from '../../modal/modal.jsx';

// const styles = {
//   form: {
//     width: '100%',
//   },
//   title: {
//     marginBottom: '.5rem',
//   },
//   description: {
//     marginTop: 25,
//     fontSize: 14,
//   },
//   textFieldInputRoot: {
//     borderRadius: 8,
//     fontWeight: 900,
//     backgroundColor: '#eaeaea',
//   },
//
//   tokenField: {
//     width: '100%',
//   },
//   tokenInput: {
//     fontSize: 16,
//   },
//   amountField: {
//     width: '50%',
//   },
//   amountLabel: {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '.5rem',
//     '& .MuiFormLabel-root': {
//       marginBottom: 0,
//     },
//   },
//   submitButton: {
//     fontSize: 14,
//     width: '100%',
//     display: 'flex',
//   },
//   depositForm: {
//     width: '100%',
//   },
//   depositField: {
//     marginBottom: '1.25rem',
//     '&.amount': {
//       marginBottom: 0,
//     },
//   },
// };
export const Deposit = () => {
  const { t } = useTranslation();
  const [isConnectOpen, setConnectOpen] = React.useState(false);
  const [isSubmitOpen, setSubmitOpen] = React.useState(false);
  const isConnected = useStoreState(state => state.common.user.isConnected);

  const openConnect = () => setConnectOpen(true);
  const closeConnect = () => setConnectOpen(false);
  const openSubmit = () => setSubmitOpen(true);
  const closeSubmit = () => setSubmitOpen(false);

  return (
    <>
      <form autoComplete="off" className={classes.form}>
        <Token classNames={classes} />
        <Amount classNames={classes} />
        {isConnected ? (
          <Button
            type="button"
            variant="contained"
            color="primary"
            className={classes.submitButton}
            onClick={openSubmit}
            disableFocusRipple
            disableRipple
            disableTouchRipple>
            {t('depositButton')}
          </Button>
        ) : (
          <Button
            type="button"
            variant="contained"
            color="primary"
            className={classes.submitButton}
            onClick={openConnect}
            disableFocusRipple
            disableRipple
            disableTouchRipple>
            {t('connect')}
          </Button>
        )}
      </form>
      <Modal open={isConnectOpen} onClose={closeConnect} title={t('yourWallet')}>
        <Connect onClose={closeConnect} />
      </Modal>
      <SubmitDepositModal open={isSubmitOpen} onClose={closeSubmit} />
      <DepositNotification />
    </>
  );
};
