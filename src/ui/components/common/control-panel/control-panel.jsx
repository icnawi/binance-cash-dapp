import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';

import { Deposit } from './deposit/deposit.jsx';
import { Statistics } from './statistics/statistics.jsx';
import { TabPanel } from './tab-panel/tab-panel.jsx';
import { UserIpInfo } from './user-ip-info/user-ip-info.jsx';
import { Withdraw } from './withdraw/withdraw.jsx';

const leftMenuTabs = [
  { id: uuid(), tabName: 'Deposit' },
  { id: uuid(), tabName: 'Withdraw' },
];
// const styles = ({ colors }) => ({
//   container: {
//     width: '50%',
//     maxWidth: 440,
//
//     '&:first-child': {
//       padding: '.75rem',
//       paddingLeft: 0,
//     },
//     '&:last-child': {
//       padding: '.75rem',
//       paddingRight: 0,
//     },
//   },
//   tabPrimary: {
//     color: colors.PRIMARY,
//     fontWeight: 700,
//     position: 'relative',
//     zIndex: 1,
//     transition: 'color .15s ease-in-out,background-color .15s ease-in-out',
//     padding: '.68rem 1.25rem',
//     fontFamily: 'PT Mono, monospace',
//     fontSize: '1.35rem',
//     textTransform: 'capitalize',
//     lineHeight: 1.5,
//     overflow: 'initial',
//
//     '&:hover': {
//       backgroundColor: colors.SEMI_DARK_PRIMARY,
//     },
//
//     '&:first-child': {
//       marginRight: '1.75rem',
//       borderTopLeftRadius: 4,
//       borderRightWidth: 0,
//       paddingLeft: '1.75rem',
//     },
//
//     '&:first-child:after': {
//       content: '""',
//       right: '-1.5rem',
//       transform: 'skewX(20deg)',
//       borderLeft: 'none',
//       borderTopRightRadius: 4,
//
//       position: 'absolute',
//       backgroundColor: colors.DARK_PRIMARY,
//       transformOrigin: 'bottom left',
//       width: '1.5rem',
//       border: `solid ${colors.PRIMARY}`,
//       borderWidth: '1px 1px 0',
//       top: -1,
//       bottom: 0,
//       transition: 'background-color .15s ease-in-out',
//     },
//     '&:first-child:hover:after': {
//       backgroundColor: colors.SEMI_DARK_PRIMARY,
//     },
//
//     '&:last-child': {
//       borderTopRightRadius: 4,
//     },
//     '&:last-child:before': {
//       content: '""',
//       left: '-1.5rem',
//       transform: 'skewX(-20deg)',
//       borderRight: 'none',
//       borderTopLeftRadius: 4,
//
//       position: 'absolute',
//       backgroundColor: colors.DARK_PRIMARY,
//       transformOrigin: 'bottom right',
//       width: '1.5rem',
//       border: `solid ${colors.PRIMARY}`,
//       borderWidth: '1px 1px 0',
//       top: -1,
//       bottom: 0,
//       transition: 'background-color .15s ease-in-out',
//     },
//     '&:last-child:hover:before': {
//       backgroundColor: colors.SEMI_DARK_PRIMARY,
//     },
//   },
//   depositTab: {
//     '&.Mui-selected': {
//       color: colors.BACKGROUND,
//       border: 0,
//       backgroundColor: colors.PRIMARY,
//       overflow: 'initial',
//
//       '&:hover:after': {
//         backgroundColor: colors.PRIMARY,
//       },
//
//       '&:after': {
//         content: '""',
//         right: '-1.5rem',
//         transform: 'skewX(20deg)',
//         borderLeft: 'none',
//         position: 'absolute',
//         backgroundColor: colors.PRIMARY,
//
//         width: '1.5rem',
//         top: -1,
//         bottom: 0,
//         transition: 'background-color .15s ease-in-out',
//       },
//     },
//   },
//   withdrawTab: {
//     '&.Mui-selected': {
//       color: colors.BACKGROUND,
//       border: 0,
//       backgroundColor: colors.PRIMARY,
//       overflow: 'initial',
//
//       '&:hover:before': {
//         backgroundColor: colors.PRIMARY,
//       },
//
//       '&:before': {
//         content: '""',
//         left: '-1.5rem',
//         transform: 'skewX(-20deg)',
//         borderRight: 'none',
//
//         position: 'absolute',
//         backgroundColor: colors.PRIMARY,
//
//         width: '1.5rem',
//         top: -1,
//         bottom: 0,
//         transition: 'background-color .15s ease-in-out',
//       },
//     },
//   },
//
//   tabPanelPrimary: {
//     backgroundColor: colors.BACKGROUND,
//     border: `1px solid ${colors.PRIMARY}`,
//     borderBottomRightRadius: 4,
//     minHeight: '19.536rem',
//
//     '& .MuiBox-root': {
//       padding: '1.5rem 1.5rem 2rem',
//     },
//   },
//   bottomLeftTab: {
//     paddingLeft: '1.75rem',
//     borderTopWidth: 0,
//     borderRightWidth: 0,
//     marginRight: '1.75rem',
//     borderBottomLeftRadius: 4,
//     border: `1px solid ${colors.PRIMARY}`,
//     display: 'inline-flex',
//     padding: '.68rem .625rem',
//     position: 'relative',
//     zIndex: 1,
//     backgroundColor: colors.BACKGROUND,
//
//     '&:after': {
//       content: '""',
//       right: '-1rem',
//       transform: 'skewX(-20deg)',
//       borderBottomRightRadius: 4,
//       borderTopWidth: 0,
//       borderLeftWidth: 0,
//       bottom: -1,
//
//       position: 'absolute',
//       border: `1px solid ${colors.GREY}`,
//       transformOrigin: 'bottom left',
//       width: '2.5em',
//       top: 0,
//       borderColor: colors.PRIMARY,
//       backgroundColor: colors.BACKGROUND,
//       zIndex: -1,
//     },
//   },
//   bottomLink: {
//     fontSize: '.7rem',
//     lineHeight: 2.9,
//   },
//   chip: {
//     marginLeft: '1rem',
//   },
//   tabSecondary: {
//     cursor: 'default',
//     fontWeight: 700,
//     position: 'relative',
//     zIndex: 1,
//     transition: 'color .15s ease-in-out,background-color .15s ease-in-out',
//     padding: '.68rem 1.25rem',
//     fontFamily: 'PT Mono, monospace',
//     fontSize: '1.35rem',
//     textTransform: 'capitalize',
//     lineHeight: 1.5,
//     overflow: 'initial',
//     borderTopLeftRadius: 4,
//     borderColor: colors.GREY,
//
//     '&:after': {
//       content: '""',
//       right: '-1.5rem',
//       transform: 'skewX(20deg)',
//       borderLeft: 'none',
//       borderTopRightRadius: 4,
//       position: 'absolute',
//       backgroundColor: colors.BACKGROUND,
//       transformOrigin: 'bottom left',
//       width: '1.5rem',
//       border: `solid ${colors.GREY}`,
//       borderWidth: '1px 1px 0',
//       top: -1,
//       bottom: 0,
//       transition: 'background-color .15s ease-in-out',
//     },
//
//     '& .MuiTab-wrapper': {
//       flexDirection: 'row',
//     },
//   },
//   tabPanelSecondary: {
//     backgroundColor: colors.BACKGROUND,
//     border: `1px solid ${colors.GREY}`,
//     borderBottomLeftRadius: 4,
//     minHeight: '19.536rem',
//
//     '& .MuiBox-root': {
//       padding: '1.5rem 1.5rem 2rem',
//     },
//   },
//   bottomRightTab: {
//     paddingRight: '1.75rem',
//     borderTopWidth: 0,
//     borderLeftWidth: 0,
//     marginLeft: '1.75rem',
//     borderBottomRightRadius: 4,
//     border: `1px solid ${colors.GREY}`,
//     display: 'inline-flex',
//     padding: '.68rem .625rem',
//     position: 'relative',
//     zIndex: 1,
//     backgroundColor: colors.BACKGROUND,
//
//     '&:before': {
//       content: '""',
//       left: '-1rem',
//       transform: 'skewX(20deg)',
//       borderBottomLeftRadius: 4,
//       borderTopWidth: 0,
//       borderRightWidth: 0,
//       bottom: -1,
//
//       position: 'absolute',
//       border: `1px solid ${colors.GREY}`,
//       transformOrigin: 'bottom right',
//       width: '2.5em',
//       top: 0,
//       backgroundColor: colors.BACKGROUND,
//       zIndex: -1,
//     },
//   },
//   anchor: {
//     color: colors.PRIMARY,
//     cursor: 'pointer',
//   },
//   ipBox: {
//     display: 'flex',
//     justifyContent: 'flex-end',
//   },
// });

export const ControlPanel = ({ type }) => {
  const { t } = useTranslation();
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
        <AppBar position="static">
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
