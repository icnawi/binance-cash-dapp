import { useStyles } from './Notification.styles';

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
  const classes = useStyles({ vertical, index });

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
