import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useStyles } from './Dashboard.styles';
import { useAppStore } from '../../../../stores/index.js';
import { Alert } from '../../common/alert/alert.jsx';
import { ControlPanel } from '../../common/control-panel/control-panel.jsx';
import { TransactionsGrid } from '../../common/transactions-grid/transactions-grid.jsx';

export const Dashboard = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const isInitialized = useAppStore(state => state.common.user.isInitialized);
  const transactions = useAppStore(state => state.deposit.transactions);
  const loadTxs = useAppStore(actions => actions.deposit.onGetTxs);

  useEffect(() => {
    let intervalId;

    if (isInitialized) {
      loadTxs();

      // Update Transaction statuses every 30 seconds
      intervalId = setInterval(() => {
        loadTxs();
      }, 30000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isInitialized, loadTxs]);

  return (
    <div className={classes.container}>
      <Alert message={t('noTokenAlert')} />
      <div className={classes.panels}>
        <ControlPanel type="tornado" />
        <ControlPanel type="stats" />
      </div>
      {transactions.length ? <TransactionsGrid /> : null}
    </div>
  );
};
