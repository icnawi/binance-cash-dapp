const styles = ({ colors }) => ({
  navigation: {
    maxWidth: 960,
    minHeight: '3.25rem',
    width: '100%',
    margin: '0 auto',
    position: 'relative',
  },
  navItem: {
    color: colors.DARK_WHITE,
    display: 'block',
    lineHeight: 1.5,
    padding: '.5rem .75rem',
    position: 'relative',
  },
  toolbar: {
    padding: 0,
  },
});

export const useStyles = makeStyles(styles, { name: 'Navigation' });
