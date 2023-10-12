const styles = ({ colors }) => ({
  container: {
    marginTop: 30,
    textAlign: 'center',
  },
  button: {
    fontSize: '1rem',
    borderRadius: 4,
    backgroundColor: colors.DARK_PRIMARY,
  },
});

export const useStyles = makeStyles(styles, { name: 'ComplianceReport' });
