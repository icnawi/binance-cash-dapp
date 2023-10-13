import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppStore } from '../../../../stores/index.js';
import { Alert } from '../../common/alert/alert.jsx';
import { ControlPanel } from '../../common/control-panel/control-panel.jsx';
import { TransactionsGrid } from '../../common/transactions-grid/transactions-grid.jsx';

export const Dashboard = () => {
  const { t } = useTranslation();
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
    <Flex maxW={960} flexGrow={1} m="0 auto" position="relative" w="auto">
      <Alert message={t('noTokenAlert')} />
      <Flex justify="space-between" mb=".75rem" boxSizing="initial">
        <ControlPanel type="tornado" />
        <ControlPanel type="stats" />
      </Flex>
      {transactions.length ? <TransactionsGrid /> : null}
    </Flex>
  );
};
