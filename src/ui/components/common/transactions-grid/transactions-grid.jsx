import { useStyles } from './TransactionsGrid.styles';
import { FilterPanel } from '../filter-panel/filter-panel.jsx';
import { TxsTable } from '../txs-table/txs-table.jsx';

export const TransactionsGrid = () => {
  const classes = useStyles();
  return (
    <div className={classes.txs}>
      <FilterPanel />
      <TxsTable />
    </div>
  );
};
