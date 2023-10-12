const styles = {
  brand: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  logo: {
    height: 75,
    maxHeight: '10rem',
  },
  link: {
    lineHeight: 1.5,
    padding: '.5rem .75rem',
    paddingLeft: 0,
    position: 'relative',
    flex: '0 0 0',
  },
};

export const useStyles = makeStyles(styles, { name: 'Brand' });
