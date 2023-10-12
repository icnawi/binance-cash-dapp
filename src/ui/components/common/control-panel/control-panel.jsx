import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';

import { useStyles } from './ControlPanel.styles';
import { Deposit } from './deposit/Deposit';
import { Statistics } from './statistics/statistics.jsx';
import { TabPanel } from './tab-panel/tab-panel.jsx';
import { UserIpInfo } from './user-ip-info/user-ip-info.jsx';
import { Withdraw } from './withdraw/withdraw.jsx';

const leftMenuTabs = [
  { id: uuid(), tabName: 'Deposit' },
  { id: uuid(), tabName: 'Withdraw' },
];

export const ControlPanel = ({ type }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const depositAmount = useStoreState(state => state.deposit.depositAmount);
  const token = useStoreState(state => state.common.tokenConfig.token);
  const networkConfig = useStoreState(state => state.common.networkConfig);
  const { scanUrl } = networkConfig;
  const contractAddress = useMemo(() => {
    return networkConfig.amounts.find(({ amount }) => Number(depositAmount) === Number(amount))
      ?.instanceContract;
  }, [networkConfig, depositAmount]);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const renderTokenCashPanel = () => {
    return (
      <>
        <AppBar position="static" className={classes.appBar}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="full width tabs example"
            TabIndicatorProps={{
              style: {
                display: 'none',
              },
            }}>
            {leftMenuTabs.map(tab => (
              <Tab
                disableRipple
                disableFocusRipple
                disableTouchRipple
                label={t(tab.tabName.toLowerCase())}
                key={tab.id}
                className={cn(
                  classes.tabPrimary,
                  tab.tabName === 'Deposit' ? classes.depositTab : classes.withdrawTab,
                )}
              />
            ))}
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0} className={classes.tabPanelPrimary}>
          <Deposit />
        </TabPanel>
        <TabPanel value={value} index={1} className={classes.tabPanelPrimary}>
          <Withdraw />
        </TabPanel>

        <footer className={classes.bottomLeftTab}>
          <span className={classes.bottomLink}>
            <Anchor
              href={`${scanUrl}/address/${contractAddress}`}
              target="_blank"
              underline="none"
              className={classes.anchor}>
              {token.toLowerCase()}-{depositAmount.toString().replace('.', '')}.binancecash.eth
            </Anchor>
          </span>
        </footer>
      </>
    );
  };

  const renderStatsPanel = () => {
    return (
      <>
        <AppBar position="static" className={classes.appBar}>
          <Tabs
            value={false}
            indicatorColor="secondary"
            textColor="secondary"
            TabIndicatorProps={{
              style: {
                display: 'none',
              },
            }}>
            <Tab
              label={
                <>
                  {t('statistics')}{' '}
                  <Chip label={`${depositAmount} ${token}`} className={classes.chip} />
                </>
              }
              className={classes.tabSecondary}
              disableFocusRipple
              disableRipple
              disableTouchRipple
            />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0} className={classes.tabPanelSecondary}>
          <Statistics />
        </TabPanel>

        <footer className={classes.ipBox}>
          <div className={classes.bottomRightTab}>
            <UserIpInfo classes={classes} />
          </div>
        </footer>
      </>
    );
  };

  return (
    <div className={classes.container}>
      {type === 'tornado' ? renderTokenCashPanel() : renderStatsPanel()}
    </div>
  );
};
