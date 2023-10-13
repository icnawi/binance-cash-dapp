import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { appConfig } from '../../../../../../../app.config';
import { Modal } from '../../../../modal/modal.jsx';
import { Tooltip } from '../../../../tooltip/tooltip.jsx';
import { NetworkChange } from '../change-network/change-network.jsx';

// const styles = ({ colors }) => ({
//   navbarIcon: {
//     backgroundColor: colors.DARK_PRIMARY,
//     border: `1px solid ${colors.PRIMARY}`,
//     borderRadius: 4,
//     color: colors.PRIMARY,
//     display: 'flex',
//     fontSize: '1rem',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 38,
//     marginRight: '.5rem',
//     minWidth: '28px',
//     padding: 'calc(.7em - 3px) .4em',
//     textAlign: 'center',
//     '& img': {
//       width: 22,
//     },
//   },
//   notSelected: {
//     opacity: 0.5,
//     cursor: 'pointer',
//     '&:hover': {
//       opacity: 1,
//     },
//   },
//   textButton: {
//     backgroundColor: 'transparent',
//     border: 'none',
//     color: colors.PRIMARY,
//     cursor: 'pointer',
//     outline: 'none',
//     '&:hover': {
//       textDecoration: 'underline',
//     },
//   },
// });

export const ChangeToken = () => {
  const { t } = useTranslation();
  const [isChangeNetworkOpen, setChangeNetworkOpen] = useState(false);
  const tokenConfig = useStoreState(state => state.common.tokenConfig);
  const network = useStoreState(state => state.common.user.network);
  const changeToken = useStoreActions(action => action.common.onChangeToken);

  const openChangeNetwork = () => setChangeNetworkOpen(true);
  const closeChangeNetwork = () => setChangeNetworkOpen(false);

  const renderTokens = () =>
    appConfig.tokens.map(({ token, networks, styles }) => {
      const activeNetwork =
        networks.find(({ netId }) => Number(netId) === Number(network)) || networks[0];
      const buttonStyles = {
        backgroundColor: styles.colors.DARK_PRIMARY,
        borderColor: styles.colors.PRIMARY,
      };

      if (tokenConfig.token === token) {
        return (
          <Tooltip
            interactive
            mode="dark"
            title={
              <>
                {activeNetwork?.name}
                <br />
                <button type="button" className={classes.textButton} onClick={openChangeNetwork}>
                  {t('change')}
                </button>
              </>
            }>
            <div className={classes.navbarIcon} style={buttonStyles}>
              <img src={activeNetwork?.icon} alt="" />
            </div>
          </Tooltip>
        );
      }

      return (
        <button
          className={cn(classes.navbarIcon, classes.notSelected)}
          type="button"
          onClick={() => changeToken(activeNetwork.netId)}
          style={buttonStyles}>
          <img src={activeNetwork?.icon} alt="" />
        </button>
      );
    });

  return (
    <>
      {renderTokens()}
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
