import { useTranslation } from 'react-i18next';

import { LanguageSelect } from './language-select/language-select.jsx';
import { useAppStore } from '../../../../stores/index.js';

// const styles = ({ colors }) => ({
//   container: {
//     fontSize: '.7rem',
//     lineHeight: 2,
//     backgroundColor: 'transparent',
//     padding: '2rem',
//   },
//   level: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: '100%',
//     margin: '0 auto',
//     maxWidth: 960,
//   },
//   levelLeft: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },
//   levelItem: {
//     display: 'flex',
//   },
//   column: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   footerAddress: {
//     display: 'flex',
//   },
//   versionLink: {
//     color: colors.PRIMARY,
//   },
//   icon: {
//     width: '2rem',
//     height: '2rem',
//   },
//   divider: {
//     display: 'inline-block',
//     margin: '0 0.5rem -0.7rem 0.5rem',
//     height: '24px',
//   },
// });

export const Footer = () => {
  const { t } = useTranslation();
  const networkConfig = useAppStore(state => state.common.networkConfig);
  return (
    <footer className={classes.container}>
      <div className={classes.level}>
        <div className={classes.levelLeft}>
          <div className={classes.column}>
            <div className={classes.levelItem}>
              <div className={classes.footerAddress}>{t('footerDonations')}&nbsp;</div>
              <Link
                href={`${networkConfig.scanUrl}/address/${networkConfig.donationAddress}`}
                target="_blank">
                {networkConfig.donationAddress}
              </Link>
            </div>
            <div className={classes.levelItem}>
              <div className={classes.version}>Tornado.cash version:&nbsp;</div>
              <span className={classes.versionLink}>BinanceCash</span>
            </div>
          </div>
        </div>
        <div className={classes.levelRight}>
          <IconButton aria-label="telegram icon" color="primary">
            <TelegramIcon className={classes.icon} />
          </IconButton>
          <IconButton aria-label="github icon" color="primary">
            <GithubIcon className={classes.icon} />
          </IconButton>
          <Divider orientation="vertical" className={classes.divider} />
          <LanguageSelect />
        </div>
      </div>
    </footer>
  );
};
