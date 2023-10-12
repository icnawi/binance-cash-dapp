const styles = ({ colors }) => ({
  container: {
    marginTop: '-15px',
  },
  metamaskButton: {
    display: 'block',
    backgroundColor: '#559774',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontFamily: '"PT mono", monospace',
    fontSize: '.75rem',
    margin: '1rem auto 0 auto',
    outline: 'none',
    padding: '.6em 1em',
    textAlign: 'center',
    transition: 'background-color .15s ease-in-out',
    width: '122px',

    '&:hover': {
      backgroundColor: colors.PRIMARY,
    },
  },
  metamaskInstallButton: {
    backgroundColor: '#171717',
    color: colors.PRIMARY,

    '&:hover': {
      backgroundColor: '#111111',
    },
  },
  metamaskIcon: {
    display: 'block',
    margin: '.25rem auto',
    width: '64px',
  },
});

export const useStyles = makeStyles(styles, { name: 'Connect' });
