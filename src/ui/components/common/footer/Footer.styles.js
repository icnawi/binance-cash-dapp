const styles = ({ colors }) => ({
  container: {
    fontSize: '.7rem',
    lineHeight: 2,
    backgroundColor: 'transparent',
    padding: '2rem',
  },
  level: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    margin: '0 auto',
    maxWidth: 960,
  },
  levelLeft: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  levelItem: {
    display: 'flex',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  footerAddress: {
    display: 'flex',
  },
  versionLink: {
    color: colors.PRIMARY,
  },
  icon: {
    width: '2rem',
    height: '2rem',
  },
  divider: {
    display: 'inline-block',
    margin: '0 0.5rem -0.7rem 0.5rem',
    height: '24px',
  },
});

export const useStyles = makeStyles(styles, { name: 'Footer' });
