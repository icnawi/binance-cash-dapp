const styles = ({ colors }) => ({
  tooltip: ({ width, placement, mode }) => ({
    backgroundColor: mode === 'dark' ? '#313131' : colors.PRIMARY,
    borderRadius: '6px',
    color: mode === 'dark' ? '#6B6B6B' : colors.BACKGROUND,
    fontFamily: '"PT mono", monospace',
    fontSize: '.85rem',
    padding: '8px 12px',
    textAlign: 'center',
    marginBottom: placement === 'top' ? '8px' : undefined,
    marginTop: placement === 'bottom' ? '8px' : undefined,
    marginRight: placement === 'left' ? '8px' : undefined,
    marginLeft: placement === 'right' ? '8px' : undefined,
    width,
  }),
  arrow: ({ mode }) => ({
    color: mode === 'dark' ? '#313131' : colors.PRIMARY,
  }),
  icon: {
    backgroundColor: colors.PRIMARY,
    borderRadius: '4px',
    margin: '0 .45rem',
    height: '16px',
    width: '16px',
    '&:hover': {
      backgroundColor: colors.ACTIVE_PRIMARY,
    },
  },
});

export const useStyles = makeStyles(styles, { name: 'Tooltip' });
