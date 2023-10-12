const styles = {
  network: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      width: 22,
      marginRight: '.8em',
    },
  },
};

export const useStyles = makeStyles(styles, { name: 'ChangeNetwork' });
