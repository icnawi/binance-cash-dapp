import { useTranslation } from 'react-i18next';

import { useStyles } from './TxHead.styles';
import { Column } from '../column/column.jsx';
import { Row } from '../row/row.jsx';

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
