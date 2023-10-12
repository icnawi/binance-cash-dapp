const styles = ({ colors }) => ({
  container: {
    width: '100%',
  },
  tabs: {
    width: '100%',
    minHeight: 20,
    '& .MuiTabs-flexContainer': {
      borderBottom: '2px solid #767676',
    },
    '& .MuiTabs-indicator': {
      backgroundColor: colors.PRIMARY,
    },
    '& .MuiTab-wrapper': {
      display: 'flex',
      flexDirection: 'row',
    },
  },
  tab: props => ({
    backgroundColor: 'transparent',
    minWidth: 70,
    minHeight: 20,
    padding: '0 0 0.5rem 0',
    width: props.tabWidth,
    fontFamily: '"PT mono", monospace',
    fontSize: '1rem',
    textTransform: 'none',
    border: 'none',
    opacity: 1,

    '&.Mui-selected': {
      backgroundColor: 'transparent',
      border: 'none',
      color: colors.PRIMARY,
    },
    '& .MuiTab-wrapper': {
      display: 'flex',
    },
  }),
});

export const useStyles = makeStyles(styles, { name: 'SimpleTabs' });
