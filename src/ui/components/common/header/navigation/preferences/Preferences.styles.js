const styles = ({ colors }) => ({
  navbarButtons: {
    flex: '1 0',
    display: 'flex',
  },
  buttonGroup: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: 0,
    paddingRight: 0,
  },
  button: {
    padding: 'calc(.5em - 1px) 1em',
    fontSize: '1rem',
    borderRadius: 4,
    backgroundColor: colors.DARK_PRIMARY,
    '&:not(:last-child)': {
      marginRight: '.5rem',
    },
  },
});

export const useStyles = makeStyles(styles, { name: 'Preferences' });
