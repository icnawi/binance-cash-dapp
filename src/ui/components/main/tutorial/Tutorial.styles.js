const styles = ({ colors }) => ({
  heroContainer: {
    padding: '3rem 1.5rem',
    flex: 1,
  },
  wrapper: {
    maxWidth: 960,
    flexGrow: 1,
    margin: ' 0 auto',
    position: 'relative',
    width: 'auto',
  },
  columns: {
    marginLeft: '-.75rem',
    marginRight: '-.75rem',
    marginTop: '-.75rem',
    '&:not(.is-desktop)': {
      display: 'flex',
    },
  },
  column: {
    flex: 'none',
    width: '50%',
  },
  isHalfDesktop: {},
  title: {
    marginBottom: '1.5rem',
    marginTop: 0,
    color: colors.PRIMARY,
  },
  content: {
    marginBottom: '1.5rem',
  },
  bullet: {
    margin: 0,
    display: 'flex',
    alignItems: 'center',
  },
  list: {
    marginLeft: '2em',
  },
  listItem: {
    padding: 0,
  },
  block: {
    display: 'flex',
  },
});

export const useStyles = makeStyles(styles, { name: 'Tutorial' });
