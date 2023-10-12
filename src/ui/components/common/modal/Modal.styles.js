const styles = {
  container: props => ({
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgba(5, 5, 5, 0.86)',
    },
    '& .MuiDialog-scrollPaper': {
      marginTop: props.top ? '4rem' : undefined,
      alignItems: props.top ? 'flex-start' : undefined,
    },
    '& .MuiDialog-paper': {
      backgroundColor: '#000403',
      border: '1px solid #393939',
      color: '#fefefe',
      fontFamily: '"PT mono", monospace',
      width: props.width || 440,
    },
  }),
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1.5rem 1.5rem 0 1.5rem',
    '& .MuiTypography-h6': {
      fontFamily: '"PT mono", monospace',
      fontSize: '1.143rem',
    },
  },
  content: {
    padding: '1.5rem',
  },
  crossButton: {
    position: 'absolute',
    right: '1.5rem',
    top: '1.5rem',
    color: '#393939',
    padding: 0,
    transitionProperty: 'color',
    '&:hover': {
      color: '#fefefe',
    },
  },
};

export const useStyles = makeStyles(styles, { name: 'Modal' });
