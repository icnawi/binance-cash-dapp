import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { formatDateDiff } from '../../../../../utils';
import { Grid } from '../../grid/grid.jsx';
import { Tooltip } from '../../tooltip/tooltip.jsx';

// const styles = ({ colors }) => ({
//   bold: {
//     fontWeight: 'bold',
//     marginRight: '.5em',
//   },
//   gridWrap: {
//     '& .MuiGrid-item': {
//       paddingBottom: '4px',
//     },
//   },
//   label: {
//     display: 'flex',
//     alignItems: 'center',
//     fontFamily: '"PT mono", monospace',
//     fontSize: '1rem',
//     marginBottom: '.55em',
//
//     '& img': {
//       margin: '0 .45rem',
//     },
//   },
//   field: {
//     display: 'flex',
//     alignItems: 'center',
//     fontFamily: '"PT mono", monospace',
//     fontSize: '1rem',
//     marginBottom: '.55em',
//     '&:not(:last-child)': {
//       marginBottom: '1.25rem',
//     },
//   },
//   timeLabel: {
//     color: colors.PRIMARY,
//   },
// });

export const Statistics = () => {
  const { t } = useTranslation();
  const depositAmount = useStoreState(state => state.deposit.depositAmount);
  const isInitialized = useStoreState(state => state.common.user.isInitialized);
  const network = useStoreState(state => state.common.user.network);
  const isLoading = useStoreState(state => state.statistics.isLoading);
  const depositNumber = useStoreState(state => state.statistics.depositNumber);
  const latestDeposits = useStoreState(state => state.statistics.latestDeposits);
  const loadStatistics = useStoreActions(actions => actions.statistics.onLoadStatistics);

  useEffect(() => {
    if (network && depositAmount && isInitialized) {
      loadStatistics({ network, depositAmount });
    }
  }, [loadStatistics, network, depositAmount, isInitialized]);

  const renderDeposit = ({ number, timestamp }) => {
    return (
      <div key={`deposit-${number}`}>
        {number}. <span className={classes.timeLabel}>{formatDateDiff(timestamp)} ago</span>
      </div>
    );
  };

  return (
    <div>
      <div className={classes.label}>
        {t('anonymitySet')}
        <Tooltip title={t('numberOfDepositsWithdrawal')} width={200} />
      </div>
      <div className={classes.field}>
        {isLoading ? (
          <Skeleton animation="pulse" width={190} />
        ) : (
          <>
            <span className={classes.bold}>{depositNumber}</span> {t('equalUserDeposits')}
          </>
        )}
      </div>
      <div className={classes.gridWrap}>
        <div className={classes.label}>{t('latestDeposits')}</div>
        <Grid items={latestDeposits.map(renderDeposit)} columnLength={5} loading={isLoading} />
      </div>
    </div>
  );
};
