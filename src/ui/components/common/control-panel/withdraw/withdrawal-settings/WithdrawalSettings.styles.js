const styles = ({ colors }) => ({
  buttonsContainer: {
    display: 'flex',
    marginTop: '1.5rem',
  },
  outlinedButton: {
    backgroundColor: colors.DARK_PRIMARY,
    width: '50%',
    marginRight: '.5rem',
  },
  submitButton: {
    width: '50%',
    marginLeft: '.5rem',
  },
});

export const useStyles = makeStyles(styles, { name: 'WithdrawalSettings' });
