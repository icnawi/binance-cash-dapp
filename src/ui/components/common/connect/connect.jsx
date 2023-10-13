import React from 'react';
import { useTranslation } from 'react-i18next';

import { appConfig } from '../../../../app.config.example';
import { isChrome } from '../../../../utils';
import metamaskIcon from '../../../images/icons/metamask.svg';
import { Loader } from '../../loader/loader.jsx';

// const styles = ({ colors }) => ({
//   container: {
//     marginTop: '-15px',
//   },
//   metamaskButton: {
//     display: 'block',
//     backgroundColor: '#559774',
//     borderRadius: '4px',
//     border: 'none',
//     cursor: 'pointer',
//     fontFamily: '"PT mono", monospace',
//     fontSize: '.75rem',
//     margin: '1rem auto 0 auto',
//     outline: 'none',
//     padding: '.6em 1em',
//     textAlign: 'center',
//     transition: 'background-color .15s ease-in-out',
//     width: '122px',
//
//     '&:hover': {
//       backgroundColor: colors.PRIMARY,
//     },
//   },
//   metamaskInstallButton: {
//     backgroundColor: '#171717',
//     color: colors.PRIMARY,
//
//     '&:hover': {
//       backgroundColor: '#111111',
//     },
//   },
//   metamaskIcon: {
//     display: 'block',
//     margin: '.25rem auto',
//     width: '64px',
//   },
// });

export const Connect = ({ onClose }) => {
  const { t } = useTranslation();
  const [isLoading, setLoading] = React.useState(false);
  const isInstalled = useStoreState(state => state.common.user.isInstalled);
  const connectToMetaMask = useStoreActions(actions => actions.common.onEstablishConnection);

  const connect = async () => {
    setLoading(true);
    await connectToMetaMask();
    onClose();
    setLoading(false);
  };

  return (
    <div className={classes.container}>
      <Typography>{t('pleaseSelectWallet')}</Typography>
      {isInstalled ? (
        <button type="button" className={classes.metamaskButton} onClick={connect}>
          <img className={classes.metamaskIcon} src={metamaskIcon} alt="metamask" />
          {t('metamask')}
        </button>
      ) : (
        <a
          href={isChrome() ? appConfig.urls.metamaskChrome : appConfig.urls.metamask}
          target="_blank"
          rel="noreferrer"
          className={`${classes.metamaskButton} ${classes.metamaskInstallButton}`}>
          <img className={classes.metamaskIcon} src={metamaskIcon} alt="metamask" />
          {t('installMetamask')}
        </a>
      )}
      {isLoading ? <Loader type="tornado" /> : ''}
    </div>
  );
};
