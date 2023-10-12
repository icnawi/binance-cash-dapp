const styles = ({ colors }) => ({
  navbarIcon: {
    backgroundColor: colors.DARK_PRIMARY,
    border: `1px solid ${colors.PRIMARY}`,
    borderRadius: 4,
    color: colors.PRIMARY,
    display: 'flex',
    fontSize: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    height: 38,
    marginRight: '.5rem',
    minWidth: '28px',
    padding: 'calc(.7em - 3px) .4em',
    textAlign: 'center',
    '& img': {
      width: 22,
    },
  },
  notSelected: {
    opacity: 0.5,
    cursor: 'pointer',
    '&:hover': {
      opacity: 1,
    },
  },
  textButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: colors.PRIMARY,
    cursor: 'pointer',
    outline: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

export const useStyles = makeStyles(styles, { name: 'ChangeToken' });
