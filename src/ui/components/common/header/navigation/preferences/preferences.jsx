import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ChangeToken } from './change-token/change-token.jsx';
import { Settings } from './settings/settings.jsx';
import { Connect } from '../../../connect/connect.jsx';
import { Modal } from '../../../modal/modal.jsx';

// const styles = ({ colors }) => ({
//   navbarButtons: {
//     flex: '1 0',
//     display: 'flex',
//   },
//   buttonGroup: {
//     alignItems: 'center',
//     display: 'flex',
//     justifyContent: 'flex-end',
//     paddingLeft: 0,
//     paddingRight: 0,
//   },
//   button: {
//     padding: 'calc(.5em - 1px) 1em',
//     fontSize: '1rem',
//     borderRadius: 4,
//     backgroundColor: colors.DARK_PRIMARY,
//     '&:not(:last-child)': {
//       marginRight: '.5rem',
//     },
//   },
// });

export const Preferences = () => {
  const { t } = useTranslation();
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isConnectOpen, setConnectOpen] = useState(false);
  const isConnected = useStoreState(state => state.common.user.isConnected);
  const setIsConnected = useStoreActions(actions => actions.common.setIsConnected);

  const logout = () => setIsConnected(false);

  const openSettings = () => setSettingsOpen(true);
  const closeSettings = () => setSettingsOpen(false);

  const openConnect = () => setConnectOpen(true);
  const closeConnect = () => setConnectOpen(false);

  return (
    <>
      <List component="nav" className={classes.navbarButtons} disablePadding>
        <ListItem button className={classes.buttonGroup} disableRipple>
          <ChangeToken />
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            startIcon={<TuneIcon />}
            onClick={openSettings}
            disableFocusRipple>
            {t('settings')}
          </Button>
          {isConnected ? (
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              startIcon={<LogoutIcon />}
              onClick={logout}
              disableFocusRipple>
              {t('logout')}
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              startIcon={<WalletIcon />}
              onClick={openConnect}
              disableFocusRipple>
              {t('connect')}
            </Button>
          )}
        </ListItem>
      </List>
      <Modal open={isSettingsOpen} onClose={closeSettings} title={t('settings')} top>
        <Settings onClose={closeSettings} />
      </Modal>
      <Modal open={isConnectOpen} onClose={closeConnect} title={t('yourWallet')}>
        <Connect onClose={closeConnect} />
      </Modal>
    </>
  );
};
