const styles = ({ colors }) => ({
  container: {
    marginTop: '1rem',
  },
  input: {
    height: '2.857rem',
    marginTop: '.75rem',
  },
  error: {
    color: colors.WARN,
    fontSize: '.75rem',
  },
  statusSuccess: {
    color: colors.PRIMARY,
    fontSize: '.75rem',
    marginTop: '.25rem',
  },
  statusError: {
    color: colors.WARN,
    fontSize: '.75rem',
    marginTop: '.25rem',
  },
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

export const useStyles = makeStyles(styles, { name: 'Settings' });
