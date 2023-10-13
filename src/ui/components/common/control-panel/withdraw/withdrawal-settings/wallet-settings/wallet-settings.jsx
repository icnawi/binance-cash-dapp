import { useTranslation } from 'react-i18next';

import { Fee } from '../../fee/fee.jsx';

// const styles = ({ colors }) => ({
//   warning: {
//     border: `1px solid ${colors.WARN}`,
//     borderRadius: 4,
//     padding: '.75rem 1rem',
//     margin: '1rem 0',
//   },
// });

export const WalletSettings = () => {
  const { t } = useTranslation();
  const walletFee = useStoreState(state => state.withdraw.walletFee);

  return (
    <div>
      <div className={classes.warning}>{t('walletWithdrawWarning')}</div>
      <Fee fee={walletFee} />
    </div>
  );
};
