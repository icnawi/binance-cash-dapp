const styles = {
  textarea: {
    position: 'absolute',
    opacity: 0,
    pointerEvents: 'none',
    width: 0,
    height: 0,
  },
};

export const useStyles = makeStyles(styles, { name: 'CopyButton' });
