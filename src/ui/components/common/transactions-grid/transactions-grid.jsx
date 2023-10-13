import { FilterPanel } from '../filter-panel/filter-panel.jsx';
import { TxsTable } from '../txs-table/txs-table.jsx';

// const styles = {
//   txs: {
//     paddingTop: '.75rem',
//     fontSize: '.85rem',
//   },
// };

export const TransactionsGrid = () => {
  return (
    <div className={classes.txs}>
      <FilterPanel />
      <TxsTable />
    </div>
  );
};
