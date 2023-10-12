import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { formatDateUTC, toDecimals } from '../../../../../utils';
import { Alert } from '../../../common/alert/alert.jsx';
import { CopyButton } from '../../../common/copy-button/copy-button.jsx';

export const ComplianceResult = () => {
  const { t } = useTranslation();
  const scanUrl = useStoreState(state => state.common.networkConfig.scanUrl);
  const { token, decimals } = useStoreState(state => state.common.tokenConfig);
  const depositData = useStoreState(state => state.compliance.depositData);
  const withdrawalData = useStoreState(state => state.compliance.withdrawalData);
  const isSpent = !!withdrawalData;
  const fee = isSpent
    ? Number(toDecimals(withdrawalData.withdrawal.returnValues.fee, decimals)).toFixed(3)
    : 0;

  return (
    <>
      {!isSpent ? (
        <Box mt="1.5rem">
          <Alert
            message={
              <Text align="center" m="0 20px">
                <Text as="span" color="warn">
                  {t('warning')}
                </Text>{' '}
                {t('complianceNotSpentWarning')}
              </Text>
            }
            closable={false}
            alertColor="#ff8a00"
          />
        </Box>
      ) : (
        ''
      )}
      <Grid container mt="1.5rem" alignItems="center">
        <Grid item md="auto" sm={12} width="45.75%">
          <Flex fontFamily="reg" fontSize="1.25rem" justify="space-between">
            <Text as="span">{t('deposit')}</Text>
            <Text as="span" color="primary.100">
              {depositData.amount} {token}
            </Text>
          </Flex>
          <Flex fontFamily="reg" fontSize="1rem" justify="space-between">
            <Text as="span" color="primary.100">
              {t('complianceStatus.verified')}
            </Text>
          </Flex>
          <Box fontFamily="reg" fontSize=".9rem" marginTop="2rem">
            <Grid container>
              <Grid item w={120} color="darkWhite" mb={10}>
                {t('date')}
              </Grid>
              <Grid
                item
                color="primary.100"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                flexGrow={1}
                w="calc(100% - 120px)"
                sx={{
                  '& a': {
                    color: 'primary.100',
                  },
                }}>
                {formatDateUTC(depositData.timeStamp)}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item width={120} color="darkWhite" mb={10}>
                {t('transaction')}
              </Grid>
              <Grid
                item
                color="primary.100"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                flexGrow={1}
                w="calc(100% - 120px)"
                sx={{
                  '& a': {
                    color: 'primary.100',
                  },
                }}>
                <Link href={`${scanUrl}/tx/${depositData.deposit.transactionHash}`} target="_blank">
                  {depositData.deposit.transactionHash}
                </Link>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item w={120} color="darkWhite" mb={10}>
                {t('from')}
              </Grid>
              <Grid
                item
                color="primary.100"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                flexGrow={1}
                w="calc(100% - 120px)"
                sx={{
                  '& a': {
                    color: 'primary.100',
                  },
                }}>
                <Link href={`${scanUrl}/address/${depositData.receipt.from}`} target="_blank">
                  {depositData.receipt.from}
                </Link>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item w={120} color="dartkWhite" mb={10}>
                {t('commitment')}
              </Grid>
              <Grid
                item
                color="primary.100"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                flexGrow={1}
                w="calc(100% - 120px)"
                sx={{
                  '& a': {
                    color: 'primary.100',
                  },
                }}>
                <CopyButton
                  textToCopy={depositData.depositParams.commitmentHex}
                  cursor="pointer"
                  placement="top-start"
                  inline>
                  {depositData.depositParams.commitmentHex}
                </CopyButton>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item md={1} sm={12}>
          <Icon
            sx={{
              color: 'primary.100',
              width: 46,
              display: 'block',
              margin: 'auto',
              '& path': {
                fill: 'primary.100',
              },
            }}
            viewBox="0 0 184 164">
            <path fillRule="evenodd" d="M140 164H80l44-82L80 0h60l44 82-44 82z" />
            <path fillRule="evenodd" d="M70 164H30l44-82L30 0h40l44 82-44 82z" opacity="0.502" />
            <path fillRule="evenodd" d="M20 164H0l44-82L0 0h20l44 82-44 82z" opacity="0.2" />
          </Icon>
        </Grid>
        <Grid item md="auto" sm={12} w="45.75%">
          <Flex fontFamily="reg" fontSize="1.25rem" justify="space-between">
            <Text as="span">{t('withdrawal')}</Text>
            <Text as="span" color="primary.100">
              {isSpent ? `${depositData.amount - fee} ${token}` : '-'}
            </Text>
          </Flex>
          {isSpent ? (
            <Flex fontFamily="reg" fontSize="1rem" justify="space-between">
              <Text as="span" color="primary.100">
                {t('complianceStatus.verified')}
              </Text>
              <Text as="span" color="#616161">
                {t('complianceRelayerFee', { fee: `${fee} ${token}` })}
              </Text>
            </Flex>
          ) : (
            <Flex fontFamily="reg" fontSize="1rem" justify="space-between">
              <Text as="span" color="warn">
                {t('complianceStatus.notSpent')}
              </Text>
            </Flex>
          )}
          <Box fontFamily="reg" fontSize=".9rem" marginTop="2rem">
            <Grid container>
              <Grid item w={120} color="darkWhite" mb="10">
                {t('date')}
              </Grid>
              <Grid
                item
                color="primary.100"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                flexGrow={1}
                w="calc(100% - 120px)"
                sx={{
                  '& a': {
                    color: 'primary.100',
                  },
                }}>
                {isSpent ? formatDateUTC(withdrawalData.withdrawalBlock.timestamp * 1000) : '-'}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item w={120} color="darkWhite" mb="10">
                {t('transaction')}
              </Grid>
              <Grid
                item
                color="primary.100"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                flexGrow={1}
                w="calc(100% - 120px)"
                sx={{
                  '& a': {
                    color: 'primary.100',
                  },
                }}>
                {isSpent ? (
                  <Link
                    href={`${scanUrl}/tx/${withdrawalData.withdrawal.transactionHash}`}
                    target="_blank">
                    {withdrawalData.withdrawal.transactionHash}
                  </Link>
                ) : (
                  '-'
                )}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item w={120} color="darkWhite" mb="10">
                {t('to')}
              </Grid>
              <Grid
                item
                color="primary.100"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                flexGrow={1}
                w="calc(100% - 120px)"
                sx={{
                  '& a': {
                    color: 'primary.100',
                  },
                }}>
                {isSpent ? (
                  <Link
                    href={`${scanUrl}/address/${withdrawalData.withdrawal.returnValues.to}`}
                    target="_blank">
                    {withdrawalData.withdrawal.returnValues.to}
                  </Link>
                ) : (
                  '-'
                )}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item width={120} color="darkWhite" mb={10}>
                {t('nullifierHash')}
              </Grid>
              <Grid
                item
                color="primary.100"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                flexGrow={1}
                w="calc(100% - 120px)"
                sx={{
                  '& a': {
                    color: 'primary.100',
                  },
                }}>
                {isSpent ? (
                  <CopyButton
                    textToCopy={withdrawalData.withdrawal.returnValues.nullifierHash}
                    cursor="pointer"
                    placement="top-start"
                    inline>
                    {withdrawalData.withdrawal.returnValues.nullifierHash}
                  </CopyButton>
                ) : (
                  '-'
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
