import { useStyles } from './Modal.styles';

export const Modal = ({ top, title, width, children, open, onClose }) => {
  const classes = useStyles({ top, width });

  return (
    <Dialog open={open} onClose={onClose} className={classes.container}>
      {title ? <DialogTitle className={classes.title}>{title}</DialogTitle> : ''}
      <IconButton
        disableFocusRipple
        disableRipple
        disableTouchRipple
        variant="outlined"
        className={classes.crossButton}
        onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <DialogContent className={classes.content}>{children}</DialogContent>
    </Dialog>
  );
};
