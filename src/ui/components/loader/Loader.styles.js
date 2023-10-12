const styles = ({ colors }) => ({
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    textAlign: 'center',
    zIndex: 100,
  },
  loadingLabel: {
    color: colors.PRIMARY,
    display: 'block',
    fontSize: '1em',
    paddingTop: '.5rem',
  },
  tornadoContainer: {
    backgroundColor: 'rgba(0,0,0,.85)',
  },
  tornadoIcon: {
    width: '60px',
    animation: '$spin 2s linear infinite',
    '& path': {
      fill: colors.PRIMARY,
    },
  },
  '@keyframes spin': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(-360deg)',
    },
  },
});

export const useStyles = makeStyles(styles, { name: 'Loader' });
