// const styles = ({ colors }) => ({
//   container: {
//     width: '100%',
//   },
//   tabs: {
//     width: '100%',
//     minHeight: 20,
//     '& .MuiTabs-flexContainer': {
//       borderBottom: '2px solid #767676',
//     },
//     '& .MuiTabs-indicator': {
//       backgroundColor: colors.PRIMARY,
//     },
//     '& .MuiTab-wrapper': {
//       display: 'flex',
//       flexDirection: 'row',
//     },
//   },
//   tab: props => ({
//     backgroundColor: 'transparent',
//     minWidth: 70,
//     minHeight: 20,
//     padding: '0 0 0.5rem 0',
//     width: props.tabWidth,
//     fontFamily: '"PT mono", monospace',
//     fontSize: '1rem',
//     textTransform: 'none',
//     border: 'none',
//     opacity: 1,
//
//     '&.Mui-selected': {
//       backgroundColor: 'transparent',
//       border: 'none',
//       color: colors.PRIMARY,
//     },
//     '& .MuiTab-wrapper': {
//       display: 'flex',
//     },
//   }),
// });

export const SimpleTabs = ({ tabs, activeIndex, onChange }) => {
  const activeTab = tabs[activeIndex];
  // const classes = useStyles({ tabWidth: `${100 / tabs.length}%` });

  const renderTabs = () =>
    tabs.map(tab => (
      <Tab
        key={tab.id}
        id={tab.id}
        label={tab.label}
        className={classes.tab}
        disableFocusRipple
        disableRipple
        disableTouchRipple
      />
    ));

  return (
    <div className={classes.container}>
      <Tabs value={activeIndex} onChange={onChange} className={classes.tabs}>
        {renderTabs()}
      </Tabs>
      {activeTab?.content}
    </div>
  );
};
