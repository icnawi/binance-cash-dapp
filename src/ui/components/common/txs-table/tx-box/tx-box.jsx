import { useTranslation } from 'react-i18next';

import { formatDateDiff, formatSubsequentDeposits } from '../../../../../utils';
import { CopyButton } from '../../copy-button/copy-button.jsx';
import { Column } from '../column/column.jsx';
import { Row } from '../row/row.jsx';

// const styles = ({ colors }) => ({
//   txBox: {
//     display: 'flex',
//     alignItems: 'center',
//     minHeight: '3.642rem',
//     margin: '-.75rem',
//     justifyContent: 'center',
//   },
//   empty: {
//     backgroundColor: '#1f1f1f',
//     padding: '1.571rem 1.429rem 1.571rem 2.143rem',
//     border: 'none',
//
//     position: 'relative',
//     zIndex: 2,
//
//     borderRadius: 6,
//     boxShadow: 'none',
//     color: '#fefefe',
//     display: 'block',
//     '& + &': {
//       marginTop: '.825rem',
//     },
//     '&:not(:last-child)': {
//       marginBottom: 0,
//     },
//   },
//   pillar: {
//     backgroundColor: '#1f1f1f',
//     padding: '1.571rem 1.429rem 1.571rem 2.143rem',
//     border: 'none',
//
//     position: 'relative',
//     zIndex: 2,
//
//     borderRadius: 6,
//     boxShadow: 'none',
//     color: '#fefefe',
//     display: 'block',
//
//     '&::before': {
//       content: '""',
//       position: 'absolute',
//       left: 0,
//       top: 0,
//       bottom: 0,
//       width: 10,
//       backgroundColor: colors.PRIMARY,
//       borderRadius: '6px 0 0 6px',
//     },
//     '& + &': {
//       marginTop: '.825rem',
//     },
//     '&:not(:last-child)': {
//       marginBottom: 0,
//     },
//   },
//   detail: {
//     display: 'flex',
//     margin: 0,
//     padding: 0,
//   },
//   detailDescription: {
//     color: colors.PRIMARY,
//     maxWidth: '100%',
//     textOverflow: 'ellipsis',
//     whiteSpace: 'nowrap',
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   ap: {
//     marginRight: '.65rem',
//   },
//   amButton: {
//     display: 'flex',
//     alignItems: 'center',
//   },
//   mineButton: {
//     '&.MuiButton-root': {
//       minWidth: 0,
//       padding: 'calc(.5em - 1px) 1em',
//     },
//     backgroundColor: '#171717',
//     borderColor: 'transparent',
//     boxShadow: 'none',
//     opacity: 0.5,
//     borderRadius: 4,
//     fontSize: '.75rem',
//     borderWidth: 1,
//     color: colors.DARK_WHITE,
//     justifyContent: 'center',
//     textAlign: 'center',
//     whiteSpace: 'nowrap',
//     height: '2.857em',
//   },
//   noteButton: {
//     backgroundColor: colors.PRIMARY,
//     height: '2.857em',
//     borderRadius: 4,
//     fontSize: '.75rem',
//     fontWeight: 700,
//     '&.MuiButton-root': {
//       minWidth: 0,
//       padding: 'calc(.5em - 1px) 1em',
//     },
//     '&:hover': {
//       backgroundColor: colors.ACTIVE_PRIMARY,
//     },
//   },
//   deleteButton: {
//     '&.MuiButton-root': {
//       minWidth: 0,
//       padding: 'calc(.5em - 1px) 1em',
//     },
//     backgroundColor: '#171717',
//     borderColor: 'transparent',
//     color: colors.PRIMARY,
//     fontSize: '.75rem',
//     height: '2.857em',
//     marginLeft: '.65rem',
//
//     '&:hover': {
//       backgroundColor: '#111',
//     },
//   },
// });

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
