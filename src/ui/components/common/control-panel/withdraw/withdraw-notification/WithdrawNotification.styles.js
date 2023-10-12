const styles = ({ colors }) => ({
  errorIcon: {
    color: colors.DARK_WHITE,
    backgroundColor: colors.ERROR,
    borderRadius: '50%',
    padding: 5,
    fontSize: '1.8rem',
    margin: '0 0.4rem',
  },
  successIcon: {
    color: '#1F1F1F',
    backgroundColor: colors.PRIMARY,
    borderRadius: '50%',
    padding: 10,
    fontSize: '1.2rem',
    margin: '0 0.4rem',
  },
  link: {
    display: 'block',
    fontSize: '0.8rem',
    color: colors.PRIMARY,
  },
  loader: {
    margin: '0 6px',
  },
  text: {
    color: colors.DARK_WHITE,
    fontSize: '0.9rem',
    lineHeight: '22px',
    marginRight: '1rem',
  },
});

export const useStyles = makeStyles(styles, { name: 'DepositNotification' });
