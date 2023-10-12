import { useTranslation } from 'react-i18next';

import { useStyles } from './ComplianceResult.styles';
import { formatDateUTC, toDecimals } from '../../../../../utils';
import { Alert } from '../../../common/alert/alert.jsx';
import { CopyButton } from '../../../common/copy-button/copy-button.jsx';

export const ComplianceResult = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const scanUrl = useStoreState(state => state.common.networkConfig.scanUrl);
  const { token, decimals } = useStoreState(state => state.common.tokenConfig);
  const depositData = useStoreState(state => state.compliance.depositData);
  const withdrawalData = useStoreState(state => state.compliance.withdrawalData);
  const isSpent = !!withdrawalData;
  const fee = isSpent
    ? Number(toDecimals(withdrawalData.withdrawal.returnValues.fee, decimals)).toFixed(3)
    : 0;

  return (
    <>
      {!isSpent ? (
        <div className={classes.container}>
          <Alert
            message={
              <Typography align="center" className={classes.alert}>
                <span className={classes.warning}>{t('warning')}</span>{' '}
                {t('complianceNotSpentWarning')}
              </Typography>
            }
            closable={false}
            alertColor="#ff8a00"
          />
        </div>
      ) : (
        ''
      )}
      <Grid container alignItems="center" className={classes.container}>
        <Grid item md="auto" sm={12} className={classes.gridItem}>
          <div className={classes.title}>
            <span>{t('deposit')}</span>
            <span className={classes.success}>
              {depositData.amount} {token}
            </span>
          </div>
          <div className={classes.subtitle}>
            <span className={classes.success}>{t('complianceStatus.verified')}</span>
          </div>
          <div className={classes.table}>
            <Grid container>
              <Grid item className={classes.tableLabel}>
                {t('date')}
              </Grid>
              <Grid item className={classes.tableValue}>
                {formatDateUTC(depositData.timeStamp)}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item className={classes.tableLabel}>
                {t('transaction')}
              </Grid>
              <Grid item className={classes.tableValue}>
                <Link href={`${scanUrl}/tx/${depositData.deposit.transactionHash}`} target="_blank">
                  {depositData.deposit.transactionHash}
                </Link>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item className={classes.tableLabel}>
                {t('from')}
              </Grid>
              <Grid item className={classes.tableValue}>
                <Link href={`${scanUrl}/address/${depositData.receipt.from}`} target="_blank">
                  {depositData.receipt.from}
                </Link>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item className={classes.tableLabel}>
                {t('commitment')}
              </Grid>
              <Grid item className={classes.tableValue}>
                <CopyButton
                  textToCopy={depositData.depositParams.commitmentHex}
                  className={classes.copyButton}
                  placement="top-start"
                  inline>
                  {depositData.depositParams.commitmentHex}
                </CopyButton>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item md={1} sm={12}>
          <svg className={classes.arrow} viewBox="0 0 184 164">
            <path fillRule="evenodd" d="M140 164H80l44-82L80 0h60l44 82-44 82z" />
            <path fillRule="evenodd" d="M70 164H30l44-82L30 0h40l44 82-44 82z" opacity="0.502" />
            <path fillRule="evenodd" d="M20 164H0l44-82L0 0h20l44 82-44 82z" opacity="0.2" />
          </svg>
        </Grid>
        <Grid item md="auto" sm={12} className={classes.gridItem}>
          <div className={classes.title}>
            <span>{t('withdrawal')}</span>
            <span className={classes.success}>
              {isSpent ? `${depositData.amount - fee} ${token}` : '-'}
            </span>
          </div>
          {isSpent ? (
            <div className={classes.subtitle}>
              <span className={classes.success}>{t('complianceStatus.verified')}</span>
              <span className={classes.dimmed}>
                {t('complianceRelayerFee', { fee: `${fee} ${token}` })}
              </span>
            </div>
          ) : (
            <div className={classes.subtitle}>
              <span className={classes.warning}>{t('complianceStatus.notSpent')}</span>
            </div>
          )}
          <div className={classes.table}>
            <Grid container>
              <Grid item className={classes.tableLabel}>
                {t('date')}
              </Grid>
              <Grid item className={classes.tableValue}>
                {isSpent ? formatDateUTC(withdrawalData.withdrawalBlock.timestamp * 1000) : '-'}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item className={classes.tableLabel}>
                {t('transaction')}
              </Grid>
              <Grid item className={classes.tableValue}>
                {isSpent ? (
                  <Link
                    href={`${scanUrl}/tx/${withdrawalData.withdrawal.transactionHash}`}
                    target="_blank">
                    {withdrawalData.withdrawal.transactionHash}
                  </Link>
                ) : (
                  '-'
                )}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item className={classes.tableLabel}>
                {t('to')}
              </Grid>
              <Grid item className={classes.tableValue}>
                {isSpent ? (
                  <Link
                    href={`${scanUrl}/address/${withdrawalData.withdrawal.returnValues.to}`}
                    target="_blank">
                    {withdrawalData.withdrawal.returnValues.to}
                  </Link>
                ) : (
                  '-'
                )}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item className={classes.tableLabel}>
                {t('nullifierHash')}
              </Grid>
              <Grid item className={classes.tableValue}>
                {isSpent ? (
                  <CopyButton
                    textToCopy={withdrawalData.withdrawal.returnValues.nullifierHash}
                    className={classes.copyButton}
                    placement="top-start"
                    inline>
                    {withdrawalData.withdrawal.returnValues.nullifierHash}
                  </CopyButton>
                ) : (
                  '-'
                )}
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  );
};
