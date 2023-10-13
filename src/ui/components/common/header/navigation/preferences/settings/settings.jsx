import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { API } from '../../../../../../../binance';
import { TextField } from '../../../../text-field/text-field.jsx';
import { TextSelect } from '../../../../text-select/text-select.jsx';

// const styles = ({ colors }) => ({
//   container: {
//     marginTop: '1rem',
//   },
//   input: {
//     height: '2.857rem',
//     marginTop: '.75rem',
//   },
//   error: {
//     color: colors.WARN,
//     fontSize: '.75rem',
//   },
//   statusSuccess: {
//     color: colors.PRIMARY,
//     fontSize: '.75rem',
//     marginTop: '.25rem',
//   },
//   statusError: {
//     color: colors.WARN,
//     fontSize: '.75rem',
//     marginTop: '.25rem',
//   },
//   buttonsContainer: {
//     display: 'flex',
//     marginTop: '1.5rem',
//   },
//   outlinedButton: {
//     backgroundColor: colors.DARK_PRIMARY,
//     width: '50%',
//     marginRight: '.5rem',
//   },
//   submitButton: {
//     width: '50%',
//     marginLeft: '.5rem',
//   },
// });

export const Settings = ({ onClose }) => {
  const { t } = useTranslation();
  const [rpcStatus, setRpcStatus] = useState(null);
  const [rpcError, setRpcError] = useState('');
  const netId = useStoreState(state => state.common.user.network);
  const rpcEndpoints = useStoreState(state => state.common.networkConfig.rpcEndpoints);
  const url = useStoreState(state => state.common.settings.rpcUrl);
  const name = useStoreState(state => state.common.settings.rpcName);
  const updateSettings = useStoreActions(actions => actions.common.updateSettings);
  const { control, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: { url, name },
  });
  const rpcName = watch('name');
  const rpcUrl = watch('url');
  const options = rpcEndpoints
    .map(rpcEndpoint => ({
      id: rpcEndpoint.name,
      name: rpcEndpoint.name,
    }))
    .concat([{ id: 'custom', name: 'Custom' }]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (rpcUrl) {
        try {
          const rpcNetwork = await API.web3.getRpcNetwork(rpcUrl);
          if (Number(rpcNetwork) === Number(netId)) {
            setRpcStatus('OK');
            setRpcError('');
          } else {
            setRpcStatus('Failed');
            setRpcError('rpcWrongNetwork');
          }
        } catch (err) {
          setRpcStatus('Failed');
          setRpcError('rpcStatusFail');
        }
      }
    }, 1000);
    setRpcStatus(null);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [rpcUrl, netId]);

  const handleNameChange = event => {
    const rpcEndpoint = rpcEndpoints.find(endpoint => endpoint.name === event.target.value);
    const urlValue = rpcEndpoint ? rpcEndpoint.url : '';
    setValue('url', urlValue);
    setValue('name', event.target.value);
  };

  const onSubmit = data => {
    updateSettings({
      rpcUrl: data.url,
      rpcName: data.name,
    });
    onClose();
  };

  const setToDefaults = () => {
    reset(rpcEndpoints[0]);
  };

  return (
    <>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextSelect
            label={t('rpcLabel')}
            options={options}
            {...field}
            loading
            onChange={handleNameChange}
          />
        )}
      />
      {rpcName === 'Custom' && (
        <TextField
          control={control}
          name="url"
          placeholder={t('enterRpcUrlPlaceholder')}
          classes={classes}
          fullWidth
          error={rpcStatus === 'Failed'}
        />
      )}
      {rpcStatus && (
        <div className={rpcStatus === 'OK' ? classes.statusSuccess : classes.statusError}>
          {rpcStatus === 'OK' ? t('rpcStatusOk') : t(rpcError)}
        </div>
      )}
      <div className={classes.buttonsContainer}>
        <Button
          type="button"
          variant="outlined"
          color="primary"
          size="large"
          className={classes.outlinedButton}
          onClick={setToDefaults}
          disableFocusRipple
          disableRipple
          disableTouchRipple>
          {t('setToDefaults')}
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          className={classes.submitButton}
          onClick={handleSubmit(onSubmit)}
          disabled={rpcStatus !== 'OK'}
          disableFocusRipple
          disableRipple
          disableTouchRipple>
          {t('save')}
        </Button>
      </div>
    </>
  );
};
