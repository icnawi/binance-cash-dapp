import { Collapse, Alert as AlertBar } from '@chakra-ui/react';
import React from 'react';

// const styles = ({ colors }) => ({
//   collapsible: {
//     marginBottom: '2rem',
//   },
//   container: ({ alertColor = '#393939' }) => ({
//     alignItems: 'center',
//     borderRadius: 6,
//     border: `1px solid ${alertColor}`,
//     color: colors.DARK_WHITE,
//     fontSize: '1rem',
//     fontFamily: `"PT mono", monospace`,
//     position: 'relative',
//     textAlign: 'center',
//     padding: 0,
//     overflow: 'hidden',
//     '& .MuiAlert-icon': {
//       position: 'relative',
//       alignSelf: 'stretch',
//       display: 'inline-flex',
//       alignItems: 'center',
//       zIndex: 100,
//       opacity: 1,
//       color: colors.DARK_WHITE,
//       paddingLeft: 7,
//
//       '& .MuiSvgIcon-root': {
//         width: 30,
//         height: 30,
//         zIndex: 200,
//         fill: colors.DARK_WHITE,
//       },
//     },
//     '& .MuiAlert-icon:after': {
//       content: '""',
//       position: 'absolute',
//       transform: 'skewX(20deg)',
//       backgroundColor: '#1d1d1d',
//       borderRight: `1px solid ${colors.GREY}`,
//       top: -1,
//       bottom: -1,
//       borderTopRightRadius: 2,
//       left: '-50%',
//       right: '-.5rem',
//     },
//   }),
//   crossButton: {
//     color: colors.GREY,
//   },
// });

export const Alert = ({ message, closable = true, alertColor }) => {
  // const classes = useStyles({ alertColor });
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
