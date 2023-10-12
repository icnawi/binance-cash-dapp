const styles = ({ colors }) => ({
  container: {
    marginTop: '1rem',
  },
  input: {
    height: '2.857rem',
    marginTop: '.75rem',
  },
  feeRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '.85rem',
    marginTop: '.75rem',
  },
  rowValue: {
    color: colors.PRIMARY,
  },
  error: {
    color: colors.WARN,
    fontSize: '.75rem',
  },
});

export const useStyles = makeStyles(styles, { name: 'RelayerSettings' });
