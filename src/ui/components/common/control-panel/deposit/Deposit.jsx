import React from 'react';
import { useTranslation } from 'react-i18next';

import { Amount } from './Amount/Amount';
import { useStyles } from './Deposit.styles';
import { DepositNotification } from './DepositNotification/DepositNotification';
import { SubmitDepositModal } from './SubmitDepositModal/SubmitDepositModal';
import { Token } from './Token/Token';
import { Connect } from '../../connect/Connect';
import { Modal } from '../../modal/modal.jsx';

export const Deposit = () => {
  const { t } = useTranslation();
  const [isConnectOpen, setConnectOpen] = React.useState(false);
  const [isSubmitOpen, setSubmitOpen] = React.useState(false);
  const isConnected = useStoreState(state => state.common.user.isConnected);

  const openConnect = () => setConnectOpen(true);
  const closeConnect = () => setConnectOpen(false);
  const openSubmit = () => setSubmitOpen(true);
  const closeSubmit = () => setSubmitOpen(false);
  const classes = useStyles();

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
