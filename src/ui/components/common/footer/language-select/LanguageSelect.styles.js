const styles = {
  container: {
    display: 'inline-block',
  },
  button: {
    paddingRight: 0,
  },
  menuItem: {
    '& img': {
      marginRight: '0.7rem',
    },
  },
  icon: {
    height: '24px',
    width: '24px',
  },
};

export const useStyles = makeStyles(styles, { name: 'LanguageSelect' });
