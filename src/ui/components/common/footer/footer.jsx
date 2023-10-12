import { useTranslation } from 'react-i18next';

import { useStyles } from './Footer.styles';
import { LanguageSelect } from './language-select/language-select.jsx';
import { useAppStore } from '../../../../stores/index.js';

export const Footer = () => {
  const { t } = useTranslation();
  const classes = useStyles();
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
