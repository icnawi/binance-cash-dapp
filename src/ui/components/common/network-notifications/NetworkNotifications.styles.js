const styles = ({ colors }) => ({
  networkAlert: {
    backgroundColor: colors.WARN,
    borderRadius: 0,
    color: '#ffffff',
    display: 'flex',
    fontFamily: '"PT mono", monospace',
    fontSize: '1rem',
    justifyContent: 'center',
    marginBottom: 10,
    textAlign: 'center',
    '& .MuiAlert-action': {
      marginLeft: 0,
    },
  },
  networkAlertButton: {
    backgroundColor: '#b36100',
    color: '#ffffff',
    padding: '0.7em 1.5em',
    '&:hover': {
      backgroundColor: '#cc6e00',
    },
  },
});

export const useStyles = makeStyles(styles, { name: 'NetworkNotifications' });
