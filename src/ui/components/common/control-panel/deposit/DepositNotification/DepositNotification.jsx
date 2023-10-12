import { useTranslation } from 'react-i18next';

import { useStyles } from './DepositNotification.styles';
import { Notification } from '../../../notification/notification.jsx';

export const DepositNotification = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const network = useStoreState(state => state.common.user.network);
  const scanUrl = useStoreState(state => state.common.networkConfig.scanUrl);
  const token = useStoreState(state => state.common.tokenConfig.token);
  const transactions = useStoreState(state => state.deposit.transactions);
  const updateTransaction = useStoreActions(actions => actions.deposit.updateTransaction);

  const renderIcon = status => {
    switch (status) {
      case 'loading':
        return <CircularProgress className={classes.loader} size={32} />;
      case 'success':
        return <SuccessIcon className={classes.successIcon} />;
      case 'failed':
        return <ErrorIcon className={classes.errorIcon} />;
      default:
        return null;
    }
  };

  const renderMessage = ({ amount, status, transactionHash }) => {
    switch (status) {
      case 'loading':
        return (
          <Typography className={classes.text}>
            {t('depositing')}{' '}
            <b>
              {amount} {token}
            </b>
            <Link
              href={`${scanUrl}/tx/${transactionHash}`}
              target="_blank"
              className={classes.link}>
              {t('viewOnScan')}
            </Link>
          </Typography>
        );
      case 'success':
        return (
          <Typography className={classes.text}>
            {t('deposited')}{' '}
            <b>
              {amount} {token}
            </b>
            <Link
              href={`${scanUrl}/tx/${transactionHash}`}
              target="_blank"
              className={classes.link}>
              {t('viewOnScan')}
            </Link>
          </Typography>
        );
      case 'failed':
        return (
          <Typography className={classes.text}>
            {t('transactionFailed')}
            <Link
              href={`${scanUrl}/tx/${transactionHash}`}
              target="_blank"
              className={classes.link}>
              {t('viewOnScan')}
            </Link>
          </Typography>
        );
      default:
        return null;
    }
  };

  const renderNotification = ({ amount, status, transactionHash }, index) => {
    return (
      <Notification
        key={transactionHash}
        open
        index={index}
        onClose={() =>
          updateTransaction({ transactionHash, network, data: { showNotification: false } })
        }
        icon={renderIcon(status)}
        showAction={false}
        closeOnClickOutside={false}
        horizontal="right"
        message={renderMessage({ amount, status, transactionHash })}
      />
    );
  };

  return (
    <>{transactions.filter(({ showNotification }) => showNotification).map(renderNotification)}</>
  );
};
