import { useTranslation } from 'react-i18next';

import { useStyles } from './TxBox.styles';
import { formatDateDiff, formatSubsequentDeposits } from '../../../../../utils';
import { CopyButton } from '../../copy-button/copy-button.jsx';
import { Column } from '../column/column.jsx';
import { Row } from '../row/row.jsx';

export const TxBox = ({ rows }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const isLoading = useStoreState(state => state.statistics.isLoading);
  const depositNumber = useStoreState(state => state.statistics.depositNumber);
  const token = useStoreState(state => state.common.tokenConfig.token);
  const networkConfig = useStoreState(state => state.common.networkConfig);

  const renderEmptyTxBox = () => (
    <div className={classes.empty}>
      <Row classNames={classes}>
        <Column>There are no elements that meet the filters.</Column>
      </Row>
    </div>
  );
  return (
    <>
      {rows?.length
        ? rows.map(row => (
            <div className={classes.pillar} key={row.id}>
              <Row key={row.id} classNames={classes}>
                <Column className="is-time">{`${formatDateDiff(row.timestamp)} ago`}</Column>
                <Column className="is-amount">{`${row.amount} ${token}`}</Column>
                <Column className="is-deposit">
                  {isLoading ? (
                    <Skeleton animation="pulse" width="100" />
                  ) : (
                    formatSubsequentDeposits(depositNumber - row.index)
                  )}
                </Column>
                <Column className="is-hash">
                  <div className={classes.details}>
                    <p className={classes.detail}>
                      <Anchor
                        underline="hover"
                        className={classes.detailDescription}
                        href={`${networkConfig.scanUrl}/tx/${row.transactionHash}`}>
                        {row.transactionHash}
                      </Anchor>
                    </p>
                  </div>
                </Column>
                <Column className="is-status">{t(row.txStatus)}</Column>
                <Column className="column-buttons">
                  <CopyButton
                    placement="left"
                    title={t('copyNote')}
                    textToCopy={row.note}
                    variant="contained"
                    startIcon={<FileCopyIcon />}
                    className={classes.noteButton}
                    disableRipple
                    disableFocusRipple
                    disableTouchRipple>
                    {t('note')}
                  </CopyButton>
                  <Button
                    variant="contained"
                    className={classes.deleteButton}
                    disableRipple
                    disableFocusRipple
                    disableTouchRipple>
                    <DeleteOutlineIcon />
                  </Button>
                </Column>
              </Row>
            </div>
          ))
        : renderEmptyTxBox()}
    </>
  );
};
