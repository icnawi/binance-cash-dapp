import { useTranslation } from 'react-i18next';

import { Column } from '../column/column.jsx';
import { Row } from '../row/row.jsx';

// const styles = ({ colors }) => ({
//   txHead: {
//     padding: '1.5rem 1.429rem 1.5rem 2.143rem',
//   },
//   row: {
//     display: 'flex',
//     margin: '-.75rem',
//   },
//   colBtn: {
//     color: colors.DARK_WHITE,
//     padding: 0,
//     minWidth: 'unset',
//
//     '& .MuiButton-label': {
//       textAlign: 'left',
//     },
//   },
// });

export const TxHead = ({ columns }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.txHead}>
      <Row classNames={classes} isHeader>
        {columns.map(col => (
          <Column key={col.id} className={col.className}>
            <Button
              variant="text"
              className={classes.colBtn}
              disableRipple
              disableFocusRipple
              disableTouchRipple>
              {t(col.name)}
            </Button>
          </Column>
        ))}
      </Row>
    </div>
  );
};
