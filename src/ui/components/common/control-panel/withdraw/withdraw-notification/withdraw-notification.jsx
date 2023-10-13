import { useTranslation } from 'react-i18next';

import { Notification } from '../../../notification/notification.jsx';

// const styles = ({ colors }) => ({
//   errorIcon: {
//     color: colors.DARK_WHITE,
//     backgroundColor: colors.ERROR,
//     borderRadius: '50%',
//     padding: 5,
//     fontSize: '1.8rem',
//     margin: '0 0.4rem',
//   },
//   successIcon: {
//     color: '#1F1F1F',
//     backgroundColor: colors.PRIMARY,
//     borderRadius: '50%',
//     padding: 10,
//     fontSize: '1.2rem',
//     margin: '0 0.4rem',
//   },
//   link: {
//     display: 'block',
//     fontSize: '0.8rem',
//     color: colors.PRIMARY,
//   },
//   loader: {
//     margin: '0 6px',
//   },
//   text: {
//     color: colors.DARK_WHITE,
//     fontSize: '0.9rem',
//     lineHeight: '22px',
//     marginRight: '1rem',
//   },
// });

export const WithdrawNotification = () => {
  const { t } = useTranslation();
  const token = useStoreState(state => state.common.tokenConfig.token);
  const scanUrl = useStoreState(state => state.common.networkConfig.scanUrl);
  const transactions = useStoreState(state => state.withdraw.transactions);
  const updateTransaction = useStoreActions(actions => actions.withdraw.updateTransaction);

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
    const txLink = transactionHash ? (
      <Link href={`${scanUrl}/tx/${transactionHash}`} target="_blank" className={classes.link}>
        {t('viewOnScan')}
      </Link>
    ) : (
      ''
    );
    switch (status) {
      case 'loading':
        return (
          <Typography className={classes.text}>
            {t('withdrawing')}{' '}
            <b>
              {amount} {token}
            </b>
            {txLink}
          </Typography>
        );
      case 'success':
        return (
          <Typography className={classes.text}>
            {t('withdrawn')}{' '}
            <b>
              {amount} {token}
            </b>
            {txLink}
          </Typography>
        );
      case 'failed':
        return (
          <Typography className={classes.text}>
            {t('transactionFailed')}
            {txLink}
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
        onClose={() => updateTransaction({ transactionHash, data: { showNotification: false } })}
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
