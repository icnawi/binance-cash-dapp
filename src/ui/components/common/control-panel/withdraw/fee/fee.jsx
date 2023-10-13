import { useTranslation } from 'react-i18next';

import { fromDecimals, toDecimals } from '../../../../../../utils';

// const styles = ({ colors }) => ({
//   feeContainer: {
//     width: '100%',
//     fontSize: '.85rem',
//     lineHeight: 1,
//     marginTop: '.9rem',
//   },
//   feeRow: {
//     display: 'flex',
//     justifyContent: 'space-between',
//
//     '& + &': {
//       marginTop: '.6rem',
//     },
//   },
//   rowValue: {
//     color: colors.PRIMARY,
//   },
//   divider: {
//     backgroundColor: '#1e3629',
//     border: 'none',
//     display: 'block',
//     height: 1,
//     margin: '.5rem 0',
//   },
//   total: {
//     marginBottom: '.5rem',
//     fontSize: '1rem',
//   },
// });

export const Fee = ({ fee }) => {
  const { t } = useTranslation();
  const tokenConfig = useStoreState(state => state.common.tokenConfig);
  const depositData = useStoreState(state => state.withdraw.depositData);
  const finalAmountToReceive =
    depositData && fee
      ? toDecimals(
          fromDecimals(depositData.amount).sub(fee.total),
          Number(tokenConfig.decimals),
          10,
        )
      : 0;

  return (
    <div className={classes.feeContainer}>
      <Span paragraph={false} className={classes.total}>
        Total
      </Span>
      {!!fee.gasPrice && (
        <div className={classes.feeRow}>
          <span>{t('gasPrice')}</span>
          <span className={classes.rowValue}>{toDecimals(fee.gasPrice, 9)} Gwei</span>
        </div>
      )}
      {!!fee.network && (
        <div className={classes.feeRow}>
          <span>{t('networkFee')}</span>
          <span className={classes.rowValue}>
            {toDecimals(fee.network)} {tokenConfig.token}
          </span>
        </div>
      )}
      {!!fee.protocolFeePercent && (
        <div className={classes.feeRow}>
          <span>{t('protocolFee')}</span>
          <span className={classes.rowValue}>{fee.protocolFeePercent}%</span>
        </div>
      )}
      {!!fee.relayer && (
        <div className={classes.feeRow}>
          <span>{t('relayerFee')}</span>
          <span className={classes.rowValue}>
            {toDecimals(fee.relayer, Number(tokenConfig.decimals), 10)} {tokenConfig.token}
          </span>
        </div>
      )}
      {!!fee.relayer && (
        <div className={classes.feeRow}>
          <span>{t('totalFee')}</span>
          <span className={classes.rowValue}>
            {toDecimals(fee.total, Number(tokenConfig.decimals), 10)} {tokenConfig.token}
          </span>
        </div>
      )}
      <Divider variant="fullWidth" className={classes.divider} />
      <div className={classes.feeRow}>
        <span>{t('tokensToReceive')}</span>
        <span className={classes.rowValue}>
          {finalAmountToReceive} {tokenConfig.token}
        </span>
      </div>
    </div>
  );
};
