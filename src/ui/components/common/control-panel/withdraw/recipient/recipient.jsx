import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TextField } from '../../../text-field/text-field.jsx';
import { Fee } from '../fee/fee.jsx';

// const styles = ({ colors }) => ({
//   textField: {
//     width: '100%',
//     height: 'auto',
//     overflow: 'hidden',
//     minHeight: '1.1876em',
//     whiteSpace: 'nowrap',
//     textOverflow: 'ellipsis',
//   },
//   field: {
//     marginBottom: '1.25rem',
//   },
//   label: {},
//   labelContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '.5rem',
//     justifyContent: 'space-between',
//   },
//   input: {
//     height: '2.857em',
//     overflow: 'hidden',
//     minHeight: '1.1876em',
//     whiteSpace: 'nowrap',
//     textOverflow: 'ellipsis',
//     marginBottom: '.8rem',
//   },
//
//   donate: {
//     color: colors.PRIMARY,
//     padding: 0,
//     height: 'auto',
//     backgroundColor: 'transparent',
//     border: 'none',
//     borderBottom: `1px dotted ${colors.PRIMARY}`,
//     borderRadius: 0,
//     fontSize: '.85rem',
//     lineHeight: 1,
//     minWidth: 0,
//   },
// });

export const Recipient = ({ control, setValue, hasError, errorMessage }) => {
  const { t } = useTranslation();
  const [address, setAddress] = useState('');
  const networkConfig = useStoreState(state => state.common.networkConfig);
  const relayerFee = useStoreState(state => state.withdraw.relayerFee);
  const walletFee = useStoreState(state => state.withdraw.walletFee);
  const useWallet = useStoreState(state => state.withdraw.useWallet);

  const donate = () => {
    setValue('recipient', networkConfig.donationAddress);
    return setAddress(networkConfig.donationAddress);
  };

  const handleChange = value => setAddress(value);

  return (
    <div className={classes.field}>
      <div className={classes.labelContainer}>
        <span>{t('recipient')}</span>
        <Button className={classes.donate} color="primary" onClick={donate}>
          {t('donate')}
        </Button>
      </div>
      <TextField
        control={control}
        name="recipient"
        variant="outlined"
        placeholder={t('enterAddressPlaceholder')}
        fullWidth
        error={hasError}
        helperText={errorMessage}
        classes={classes}
        onChange={handleChange}
      />
      {address.length > 0 && !!walletFee && !hasError && (
        <Fee fee={useWallet ? walletFee : relayerFee} />
      )}
    </div>
  );
};
