const styles = ({ colors }) => ({
  txHead: {
    padding: '1.5rem 1.429rem 1.5rem 2.143rem',
  },
  row: {
    display: 'flex',
    margin: '-.75rem',
  },
  colBtn: {
    color: colors.DARK_WHITE,
    padding: 0,
    minWidth: 'unset',

    '& .MuiButton-label': {
      textAlign: 'left',
    },
  },
});

export const useStyles = makeStyles(styles, { name: 'TxHead' });
