const styles = ({ colors }) => ({
  feeContainer: {
    width: '100%',
    fontSize: '.85rem',
    lineHeight: 1,
    marginTop: '.9rem',
  },
  feeRow: {
    display: 'flex',
    justifyContent: 'space-between',

    '& + &': {
      marginTop: '.6rem',
    },
  },
  rowValue: {
    color: colors.PRIMARY,
  },
  divider: {
    backgroundColor: '#1e3629',
    border: 'none',
    display: 'block',
    height: 1,
    margin: '.5rem 0',
  },
  total: {
    marginBottom: '.5rem',
    fontSize: '1rem',
  },
});

export const useStyles = makeStyles(styles, { name: 'Fee' });
