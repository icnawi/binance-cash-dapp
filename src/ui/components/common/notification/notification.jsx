// const styles = ({ colors }) => ({
//   alert: {
//     backgroundColor: '#1F1F1F',
//     color: colors.PRIMARY,
//     display: 'flex',
//     alignItems: 'center',
//     fontFamily: '"PT mono", monospace',
//     fontSize: '1rem',
//     minWidth: 280,
//     padding: '0.6em 1em',
//     '& .MuiAlert-message': {
//       fontSize: '1rem',
//     },
//     '& .MuiAlert-action .MuiSvgIcon-root': {
//       color: '#6b6b6b',
//       fontSize: '1.8rem',
//       margin: '0 6px',
//       '&:hover': {
//         color: '#ffffff',
//       },
//     },
//   },
//   button: {
//     color: colors.PRIMARY,
//     minWidth: 50,
//     padding: '.8em',
//     '&:hover': {
//       backgroundColor: '#0a0a0a',
//     },
//   },
//   snackbar: props => ({
//     top: props.vertical === 'top' ? 24 + props.index * 100 : undefined,
//   }),
// });

export const Notification = ({
  open,
  onClose,
  message,
  severity = 'info',
  buttonText = 'OK',
  vertical = 'top',
  horizontal = 'center',
  closeOnClickOutside = true,
  showAction = true,
  icon = false,
  index = 0,
}) => {
  return (
    <Snackbar
      className={classes.snackbar}
      open={open}
      autoHideDuration={null}
      anchorOrigin={{ vertical, horizontal }}
      onClose={closeOnClickOutside ? onClose : undefined}>
      <Alert
        onClose={onClose}
        severity={severity}
        icon={icon}
        className={classes.alert}
        action={
          showAction ? (
            <Button className={classes.button} onClick={onClose}>
              {buttonText}
            </Button>
          ) : undefined
        }>
        {message}
      </Alert>
    </Snackbar>
  );
};
