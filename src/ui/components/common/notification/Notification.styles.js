const styles = ({ colors }) => ({
  alert: {
    backgroundColor: '#1F1F1F',
    color: colors.PRIMARY,
    display: 'flex',
    alignItems: 'center',
    fontFamily: '"PT mono", monospace',
    fontSize: '1rem',
    minWidth: 280,
    padding: '0.6em 1em',
    '& .MuiAlert-message': {
      fontSize: '1rem',
    },
    '& .MuiAlert-action .MuiSvgIcon-root': {
      color: '#6b6b6b',
      fontSize: '1.8rem',
      margin: '0 6px',
      '&:hover': {
        color: '#ffffff',
      },
    },
  },
  button: {
    color: colors.PRIMARY,
    minWidth: 50,
    padding: '.8em',
    '&:hover': {
      backgroundColor: '#0a0a0a',
    },
  },
  snackbar: props => ({
    top: props.vertical === 'top' ? 24 + props.index * 100 : undefined,
  }),
});

export const useStyles = makeStyles(styles, { name: 'Notification' });
