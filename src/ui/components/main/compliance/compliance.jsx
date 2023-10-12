import { Flex, Heading, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useStyles } from './Compliance.styles';
import { ComplianceReport } from './compliance-report/ComplianceReport';
import { ComplianceResult } from './compliance-result/ComplianceResult';
import { Note } from './note/note.jsx';
import { useAppStore } from '../../../../stores/index.js';

export const Compliance = () => {
  const { t } = useTranslation();
  const network = useAppStore(state => state.common.user.network);
  const depositData = useAppStore(state => state.compliance.depositData);
  const withdrawalData = useAppStore(state => state.compliance.withdrawalData);
  const resetCompliance = useAppStore(actions => actions.compliance.resetState);
  const { control, reset } = useForm();
  const classes = useStyles();

  useEffect(() => {
    resetCompliance();
    reset({ note: '' });
  }, [resetCompliance, reset, network]);

  return (
    <Flex maxW={960} flexGrow={1} m="0 auto" position="relative" w="100%">
      <Heading
        as="h2"
        fontFamily='"PT mono", monospace'
        fontWeight={800}
        textAlign="center"
        fontSize="3rem"
        mb={16}>
        {t('monsoon')}
        <Text as="span" color="primary.100">
          {t('complianceTool')}
        </Text>
      </Heading>
      <Text mb={30} textAlign="center">
        {t('complianceDescription.line1')} <br />
        {t('complianceDescription.line2')} <br />
        {t('complianceDescription.line3')}
      </Text>
      <Note control={control} />
      {!!depositData && <ComplianceResult />}
      {!!withdrawalData && <ComplianceReport />}
    </Flex>
  );
};
