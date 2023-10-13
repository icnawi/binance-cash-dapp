import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppStore } from '../../../../stores/index.js';
import { NetworkChange } from '../header/navigation/preferences/change-network/change-network.jsx';
import { Modal } from '../modal/modal.jsx';
import { Notification } from '../notification/notification.jsx';

// const styles = ({ colors }) => ({
//   networkAlert: {
//     backgroundColor: colors.WARN,
//     borderRadius: 0,
//     color: '#ffffff',
//     display: 'flex',
//     fontFamily: '"PT mono", monospace',
//     fontSize: '1rem',
//     justifyContent: 'center',
//     marginBottom: 10,
//     textAlign: 'center',
//     '& .MuiAlert-action': {
//       marginLeft: 0,
//     },
//   },
//   networkAlertButton: {
//     backgroundColor: '#b36100',
//     color: '#ffffff',
//     padding: '0.7em 1.5em',
//     '&:hover': {
//       backgroundColor: '#cc6e00',
//     },
//   },
// });

export const NetworkNotifications = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [isChangeNetworkOpen, setChangeNetworkOpen] = useState(false);
  const [isNetworkAlertOpen, setNetworkAlertOpen] = useState(false);
  const isConnected = useAppStore(state => state.common.user.isConnected);
  const network = useAppStore(state => state.common.user.network);
  const tokenConfig = useAppStore(state => state.common.tokenConfig);
  const metaMaskNetwork = useAppStore(state => Number(state.common.user.metaMaskNetwork));

  useEffect(() => {
    // If has metamask network and it is not supported
    if (
      isConnected &&
      metaMaskNetwork &&
      tokenConfig.networks.every(({ netId }) => Number(netId) !== metaMaskNetwork)
    ) {
      setNetworkAlertOpen(true);
    } else {
      setNetworkAlertOpen(false);
    }
  }, [isConnected, metaMaskNetwork, tokenConfig.networks]);

  const openChangeNetwork = () => setChangeNetworkOpen(true);
  const closeChangeNetwork = () => setChangeNetworkOpen(false);

  const closeNetworkAlert = () => setNetworkAlertOpen(false);

  return (
    <>
      {metaMaskNetwork && Number(metaMaskNetwork) !== Number(network) ? (
        <Alert
          className={classes.networkAlert}
          severity="warning"
          icon={false}
          action={
            <Button className={classes.networkAlertButton} onClick={openChangeNetwork}>
              {t('changeNetwork')}
            </Button>
          }>
          {t('networkMismatchError', { network })}
        </Alert>
      ) : (
        ''
      )}
      <Notification
        open={isNetworkAlertOpen}
        onClose={closeNetworkAlert}
        message={t('networkNotSupportedError', { token: tokenConfig.token })}
      />
      <Modal
        open={isChangeNetworkOpen}
        onClose={closeChangeNetwork}
        title={t('changeNetwork')}
        width={240}>
        <NetworkChange onClose={closeChangeNetwork} />
      </Modal>
    </>
  );
};
