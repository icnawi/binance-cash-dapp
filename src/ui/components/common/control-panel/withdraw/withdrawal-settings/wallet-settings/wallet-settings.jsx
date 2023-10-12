import { useTranslation } from 'react-i18next';

import { useStyles } from './WalletSettings.styles';
import { Fee } from '../../fee/fee.jsx';

export const WalletSettings = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const walletFee = useStoreState(state => state.withdraw.walletFee);

  return (
    <div>
      <div className={classes.warning}>{t('walletWithdrawWarning')}</div>
      <Fee fee={walletFee} />
    </div>
  );
};
