import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { formatDateDiff, formatSubsequentDeposits } from '../../../../../../utils';
import { Loader } from '../../../../loader/loader.jsx';
import { Modal } from '../../../modal/modal.jsx';
// import { TextField } from '../../../text-field/text-field.jsx';
import { Tooltip } from '../../../tooltip/tooltip.jsx';
import { WithdrawalSettings } from '../withdrawal-settings/withdrawal-settings.jsx';

export const Note = ({ control, hasError }) => {
  const { t } = useTranslation();
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const netId = useStoreState(state => state.common.user.network);
  const token = useStoreState(state => state.common.tokenConfig.token);
  const noteError = useStoreState(state => state.withdraw.noteError);
  const isNoteLoading = useStoreState(state => state.withdraw.isNoteLoading);
  const depositData = useStoreState(state => state.withdraw.depositData);
  const isNoteLoaded = !!depositData && !noteError;

  const parseNote = useStoreActions(actions => actions.withdraw.onParseNote);

  const openSettings = () => setSettingsOpen(true);
  const closeSettings = () => setSettingsOpen(false);

  const handleChange = note => parseNote({ note, netId });

  return (
    <Stack mb="1.25rem">
      <Flex justify="space-between">
        <Flex align="center" mb=".5rem">
          <Text as="span">{t('note')}</Text>
          <Tooltip placement="right" title={t('enterNoteTooltip')} width={180} />
        </Flex>
        <Flex>
          {isNoteLoaded && (
            <Tooltip placement="right" label={t('withdrawalSettings')}>
              <TuneIcon
                color="primary.100"
                cursor="pointer"
                w={24}
                ml=".25rem"
                sx={{
                  '&:hover': {
                    color: 'primary.200',
                  },
                }}
                onClick={openSettings}
              />
            </Tooltip>
          )}
        </Flex>
      </Flex>
      {/*<TextField*/}
      {/*  control={control}*/}
      {/*  name="note"*/}
      {/*  variant="outlined"*/}
      {/*  placeholder={t('enterNotePlaceholder')}*/}
      {/*  fullWidth*/}
      {/*  classes={classes}*/}
      {/*  error={!!noteError || hasError}*/}
      {/*  helperText={noteError}*/}
      {/*  onChange={handleChange}*/}
      {/*/>*/}
      {isNoteLoaded && (
        <Box w="100%" fontSize=".85rem" lineHeight={1} mt="1.25rem">
          <Flex
            justify="space-between"
            sx={{
              '& + &': {
                marginTop: '.6rem',
              },
            }}>
            <Text as="span">{t('amount')}</Text>
            <Text as="span" color="primary.100">
              {depositData.amount} {token}
            </Text>
          </Flex>
          <Flex
            justify="space-between"
            sx={{
              '& + &': {
                marginTop: '.6rem',
              },
            }}>
            <Text as="span">{t('timePassed')}</Text>
            <Text as="span" color="primary.100">
              {formatDateDiff(depositData.timeStamp)}
            </Text>
          </Flex>
          <Flex
            justify="space-between"
            sx={{
              '& + &': {
                marginTop: '.6rem',
              },
            }}>
            <Text as="span">{t('subsequentDeposits')}</Text>
            <Text as="span" color="primary.100">
              {formatSubsequentDeposits(depositData.subsequentDeposits)}
            </Text>
          </Flex>
        </Box>
      )}
      {isNoteLoading ? <Loader type="tornado">{t('gettingNoteData')}</Loader> : ''}
      <Modal
        open={isNoteLoaded && isSettingsOpen}
        title={t('withdrawalSettings')}
        onClose={closeSettings}
        top>
        <WithdrawalSettings onSave={closeSettings} />
      </Modal>
    </Stack>
  );
};
