import { v4 as uuid } from 'uuid';

import { TxBox } from './tx-box/tx-box.jsx';
import { TxHead } from './tx-head/tx-head.jsx';

const columns = [
  {
    id: uuid(),
    field: 'timePassed',
    name: 'timePassed',
    className: 'is-time is-header',
    isSortable: true,
  },
  {
    id: uuid(),
    field: 'amount',
    name: 'amount',
    className: 'is-amount is-header',
    isSortable: true,
  },
  {
    id: uuid(),
    field: 'subseqDepo',
    name: 'subsequentDeposits',
    className: 'is-deposit is-header',
    isSortable: true,
  },
  { id: uuid(), field: 'txHash', name: 'Tx Hash', className: 'is-hash is-header' },
  { id: uuid(), field: 'status', name: 'Status', className: 'is-status is-header' },
  { id: uuid(), className: 'column-buttons is-header' },
];

export const TxsTable = () => {
  const rows = useStoreState(state => state.deposit.transactions);
  return (
    <>
      <TxHead columns={columns} />
      <TxBox rows={rows} />
    </>
  );
};
