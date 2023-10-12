import { useStyles } from './SimpleTabs.styles';

export const SimpleTabs = ({ tabs, activeIndex, onChange }) => {
  const activeTab = tabs[activeIndex];
  const classes = useStyles({ tabWidth: `${100 / tabs.length}%` });

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
