import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useStyles } from './Recipient.styles';
import { TextField } from '../../../text-field/text-field.jsx';
import { Fee } from '../fee/fee.jsx';

export const Recipient = ({ control, setValue, hasError, errorMessage }) => {
  const { t } = useTranslation();
  const classes = useStyles();
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
