const styles = ({ colors }) => ({
  container: {
    width: '50%',
    maxWidth: 440,

    '&:first-child': {
      padding: '.75rem',
      paddingLeft: 0,
    },
    '&:last-child': {
      padding: '.75rem',
      paddingRight: 0,
    },
  },
  tabPrimary: {
    color: colors.PRIMARY,
    fontWeight: 700,
    position: 'relative',
    zIndex: 1,
    transition: 'color .15s ease-in-out,background-color .15s ease-in-out',
    padding: '.68rem 1.25rem',
    fontFamily: 'PT Mono, monospace',
    fontSize: '1.35rem',
    textTransform: 'capitalize',
    lineHeight: 1.5,
    overflow: 'initial',

    '&:hover': {
      backgroundColor: colors.SEMI_DARK_PRIMARY,
    },

    '&:first-child': {
      marginRight: '1.75rem',
      borderTopLeftRadius: 4,
      borderRightWidth: 0,
      paddingLeft: '1.75rem',
    },

    '&:first-child:after': {
      content: '""',
      right: '-1.5rem',
      transform: 'skewX(20deg)',
      borderLeft: 'none',
      borderTopRightRadius: 4,

      position: 'absolute',
      backgroundColor: colors.DARK_PRIMARY,
      transformOrigin: 'bottom left',
      width: '1.5rem',
      border: `solid ${colors.PRIMARY}`,
      borderWidth: '1px 1px 0',
      top: -1,
      bottom: 0,
      transition: 'background-color .15s ease-in-out',
    },
    '&:first-child:hover:after': {
      backgroundColor: colors.SEMI_DARK_PRIMARY,
    },

    '&:last-child': {
      borderTopRightRadius: 4,
    },
    '&:last-child:before': {
      content: '""',
      left: '-1.5rem',
      transform: 'skewX(-20deg)',
      borderRight: 'none',
      borderTopLeftRadius: 4,

      position: 'absolute',
      backgroundColor: colors.DARK_PRIMARY,
      transformOrigin: 'bottom right',
      width: '1.5rem',
      border: `solid ${colors.PRIMARY}`,
      borderWidth: '1px 1px 0',
      top: -1,
      bottom: 0,
      transition: 'background-color .15s ease-in-out',
    },
    '&:last-child:hover:before': {
      backgroundColor: colors.SEMI_DARK_PRIMARY,
    },
  },
  depositTab: {
    '&.Mui-selected': {
      color: colors.BACKGROUND,
      border: 0,
      backgroundColor: colors.PRIMARY,
      overflow: 'initial',

      '&:hover:after': {
        backgroundColor: colors.PRIMARY,
      },

      '&:after': {
        content: '""',
        right: '-1.5rem',
        transform: 'skewX(20deg)',
        borderLeft: 'none',
        position: 'absolute',
        backgroundColor: colors.PRIMARY,

        width: '1.5rem',
        top: -1,
        bottom: 0,
        transition: 'background-color .15s ease-in-out',
      },
    },
  },
  withdrawTab: {
    '&.Mui-selected': {
      color: colors.BACKGROUND,
      border: 0,
      backgroundColor: colors.PRIMARY,
      overflow: 'initial',

      '&:hover:before': {
        backgroundColor: colors.PRIMARY,
      },

      '&:before': {
        content: '""',
        left: '-1.5rem',
        transform: 'skewX(-20deg)',
        borderRight: 'none',

        position: 'absolute',
        backgroundColor: colors.PRIMARY,

        width: '1.5rem',
        top: -1,
        bottom: 0,
        transition: 'background-color .15s ease-in-out',
      },
    },
  },

  tabPanelPrimary: {
    backgroundColor: colors.BACKGROUND,
    border: `1px solid ${colors.PRIMARY}`,
    borderBottomRightRadius: 4,
    minHeight: '19.536rem',

    '& .MuiBox-root': {
      padding: '1.5rem 1.5rem 2rem',
    },
  },
  bottomLeftTab: {
    paddingLeft: '1.75rem',
    borderTopWidth: 0,
    borderRightWidth: 0,
    marginRight: '1.75rem',
    borderBottomLeftRadius: 4,
    border: `1px solid ${colors.PRIMARY}`,
    display: 'inline-flex',
    padding: '.68rem .625rem',
    position: 'relative',
    zIndex: 1,
    backgroundColor: colors.BACKGROUND,

    '&:after': {
      content: '""',
      right: '-1rem',
      transform: 'skewX(-20deg)',
      borderBottomRightRadius: 4,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      bottom: -1,

      position: 'absolute',
      border: `1px solid ${colors.GREY}`,
      transformOrigin: 'bottom left',
      width: '2.5em',
      top: 0,
      borderColor: colors.PRIMARY,
      backgroundColor: colors.BACKGROUND,
      zIndex: -1,
    },
  },
  bottomLink: {
    fontSize: '.7rem',
    lineHeight: 2.9,
  },
  chip: {
    marginLeft: '1rem',
  },
  tabSecondary: {
    cursor: 'default',
    fontWeight: 700,
    position: 'relative',
    zIndex: 1,
    transition: 'color .15s ease-in-out,background-color .15s ease-in-out',
    padding: '.68rem 1.25rem',
    fontFamily: 'PT Mono, monospace',
    fontSize: '1.35rem',
    textTransform: 'capitalize',
    lineHeight: 1.5,
    overflow: 'initial',
    borderTopLeftRadius: 4,
    borderColor: colors.GREY,

    '&:after': {
      content: '""',
      right: '-1.5rem',
      transform: 'skewX(20deg)',
      borderLeft: 'none',
      borderTopRightRadius: 4,
      position: 'absolute',
      backgroundColor: colors.BACKGROUND,
      transformOrigin: 'bottom left',
      width: '1.5rem',
      border: `solid ${colors.GREY}`,
      borderWidth: '1px 1px 0',
      top: -1,
      bottom: 0,
      transition: 'background-color .15s ease-in-out',
    },

    '& .MuiTab-wrapper': {
      flexDirection: 'row',
    },
  },
  tabPanelSecondary: {
    backgroundColor: colors.BACKGROUND,
    border: `1px solid ${colors.GREY}`,
    borderBottomLeftRadius: 4,
    minHeight: '19.536rem',

    '& .MuiBox-root': {
      padding: '1.5rem 1.5rem 2rem',
    },
  },
  bottomRightTab: {
    paddingRight: '1.75rem',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    marginLeft: '1.75rem',
    borderBottomRightRadius: 4,
    border: `1px solid ${colors.GREY}`,
    display: 'inline-flex',
    padding: '.68rem .625rem',
    position: 'relative',
    zIndex: 1,
    backgroundColor: colors.BACKGROUND,

    '&:before': {
      content: '""',
      left: '-1rem',
      transform: 'skewX(20deg)',
      borderBottomLeftRadius: 4,
      borderTopWidth: 0,
      borderRightWidth: 0,
      bottom: -1,

      position: 'absolute',
      border: `1px solid ${colors.GREY}`,
      transformOrigin: 'bottom right',
      width: '2.5em',
      top: 0,
      backgroundColor: colors.BACKGROUND,
      zIndex: -1,
    },
  },
  anchor: {
    color: colors.PRIMARY,
    cursor: 'pointer',
  },
  ipBox: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

export const useStyles = makeStyles(styles, { name: 'TabPanel' });
