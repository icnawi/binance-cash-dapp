const styles = {
  container: {
    maxWidth: 960,
    flexGrow: 1,
    margin: '0 auto',
    position: 'relative',
    width: 'auto',
  },
  panels: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '.75rem',
    boxSizing: 'initial',
  },
};

export const useStyles = makeStyles(styles, { name: 'Dashboard' });
