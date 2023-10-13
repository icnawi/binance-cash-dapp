import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TextField } from '../../../../text-field/text-field.jsx';
import { TextSelect } from '../../../../text-select/text-select.jsx';
import { Fee } from '../../fee/fee.jsx';

// const styles = ({ colors }) => ({
//   container: {
//     marginTop: '1rem',
//   },
//   input: {
//     height: '2.857rem',
//     marginTop: '.75rem',
//   },
//   feeRow: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     fontSize: '.85rem',
//     marginTop: '.75rem',
//   },
//   rowValue: {
//     color: colors.PRIMARY,
//   },
//   error: {
//     color: colors.WARN,
//     fontSize: '.75rem',
//   },
// });

export const RelayerSettings = ({ control, watch, relayerInfo }) => {
  const { t } = useTranslation();
  const relayerApis = useStoreState(state => state.common.networkConfig.relayerApis);
  const relayerFee = useStoreState(state => state.withdraw.relayerFee);
  const relayerName = watch('relayerName');

  const options = relayerApis
    .map(({ name }) => ({
      id: name,
      name,
    }))
    .concat([{ id: 'custom', name: 'Custom' }]);

  const getRelayerNameValue = name => {
    if (name === 'default' && relayerApis) {
      return relayerApis[0].name;
    }

    return name;
  };

  return (
    <div className={classes.container}>
      <Controller
        control={control}
        name="relayerName"
        render={({ field }) => (
          <TextSelect
            label={t('relayer')}
            options={options}
            onChange={field.onChange}
            {...field}
            value={getRelayerNameValue(field.value)}
          />
        )}
      />
      {relayerName === 'Custom' && (
        <TextField
          control={control}
          name="customUrl"
          placeholder={t('yourRelayerPlaceholder')}
          classes={classes}
          fullWidth
          error={!!relayerInfo.error}
        />
      )}
      <div className={classes.feeRow}>
        <span>{t('relayerFee')}</span>
        <span className={classes.rowValue}>{relayerInfo.status?.tornadoServiceFee || '0.0'}%</span>
      </div>
      {!!relayerInfo.error && <div className={classes.error}>{relayerInfo.error}</div>}
      <Fee fee={relayerFee} />
    </div>
  );
};
