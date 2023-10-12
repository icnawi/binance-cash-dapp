import { Collapse, Alert as AlertBar } from '@chakra-ui/react';
import React from 'react';

export const Alert = ({ message, closable = true, alertColor }) => {
  const classes = useStyles({ alertColor });
  const [open, setOpen] = React.useState(true);

  const handleShutAlert = () => setOpen(false);
  return (
    <Collapse in={open} animateOpacity mb="2rem">
      <AlertBar
        status="info"
        variant="outlined"
        action={
          closable ? (
            <IconButton
              aria-label="close"
              color="inherit"
              size="medium"
              className={classes.crossButton}
              onClick={handleShutAlert}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          ) : undefined
        }>
        {message}
      </AlertBar>
    </Collapse>
  );
};
