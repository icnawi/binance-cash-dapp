import {
  Text,
  Link,
  Page,
  View,
  Document,
  Font,
  PDFDownloadLink,
  StyleSheet,
} from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';

import { useStyles } from './ComplianceReport.styles';
import { formatDateUTC, insertAt, toDecimals } from '../../../../../utils';

// Styles
const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 35,
    paddingVertical: 35,
    fontFamily: 'PT Mono',
    lineHeight: '1.4px',
  },

  heading: {
    fontSize: 18,
    fontFamily: 'PT Mono',
  },

  headingBold: {
    fontSize: 18,
    fontFamily: 'PT Mono Bold',
  },

  title: {
    fontFamily: 'PT Mono',
    fontSize: 12,
  },

  titleBold: {
    fontFamily: 'PT Mono Bold',
    fontSize: 12,
  },

  subtitle: {
    fontFamily: 'PT Mono',
    fontSize: 7,
    margin: '4px 0 8px 0',
  },

  note: {
    margin: '20px 0',
  },

  label: {
    fontSize: 9,
    fontFamily: 'PT Mono',
    color: '#393939',
  },

  value: {
    fontSize: 9,
    fontFamily: 'PT Mono Bold',
    margin: '6px 0 8px 0',
  },

  grid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  transactionColumn: {
    width: '47%',
  },

  transactionRow: {
    marginTop: 10,
  },

  warning: {
    marginTop: 30,
  },

  warningContent: {
    fontSize: 9,
    fontFamily: 'PT Mono',
    marginTop: 10,
    color: '#393939',
  },
});

Font.register({
  family: 'PT Mono',
  src: '/fonts/pt-mono.regular.ttf',
});

Font.register({
  family: 'PT Mono Bold',
  src: '/fonts/pt-mono.bold.ttf',
});

export const ComplianceReport = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const scanUrl = useStoreState(state => state.common.networkConfig.scanUrl);
  const note = useStoreState(state => state.compliance.note);
  const depositData = useStoreState(state => state.compliance.depositData);
  const withdrawalData = useStoreState(state => state.compliance.withdrawalData);
  const { token, decimals } = useStoreState(state => state.common.tokenConfig);
  const fee = Number(toDecimals(withdrawalData.withdrawal.returnValues.fee, decimals)).toFixed(3);
  const fileName = `monsoon-compliance-${token.toLowerCase()}-${depositData.amount}.pdf`;

  const renderReport = () => {
    return (
      <Document>
        <Page style={styles.page} size="A4" wrap>
          <View>
            <Text style={styles.heading}>
              <View style={styles.headingBold}>Monsoon</View> {t('complianceReport.title')}
            </Text>
          </View>
          <View style={styles.note}>
            <Text style={styles.label}>{t('complianceReport.note')}</Text>
            <Text style={styles.value}>{insertAt(note, '\n', 95)}</Text>
          </View>
          <View style={styles.grid}>
            <View style={styles.transactionColumn}>
              <View style={styles.grid}>
                <Text style={styles.title}>{t('complianceReport.deposit')}</Text>
                <Text style={styles.titleBold}>
                  {depositData.amount} {token}
                </Text>
              </View>
              <View style={styles.grid}>
                <Text style={styles.subtitle}>{t('complianceReport.verified')}</Text>
              </View>
              <View style={styles.transactionRow}>
                <Text style={styles.label}>{t('complianceReport.date')}</Text>
                <Text style={styles.value}>{formatDateUTC(depositData.timeStamp)}</Text>
              </View>
              <View style={styles.transactionRow}>
                <Text style={styles.label}>{t('complianceReport.transaction')}</Text>
                <Link
                  href={`${scanUrl}/tx/${depositData.deposit.transactionHash}`}
                  style={styles.value}>
                  {insertAt(depositData.deposit.transactionHash, '\n', 42)}
                </Link>
              </View>
              <View style={styles.transactionRow}>
                <Text style={styles.label}>{t('complianceReport.from')}</Text>
                <Link href={`${scanUrl}/address/${depositData.receipt.from}`} style={styles.value}>
                  {depositData.receipt.from}
                </Link>
              </View>
              <View style={styles.transactionRow}>
                <Text style={styles.label}>{t('complianceReport.commitment')}</Text>
                <Text style={styles.value}>
                  {insertAt(depositData.depositParams.commitmentHex, '\n', 42)}
                </Text>
              </View>
            </View>
            <View style={styles.transactionColumn}>
              <View style={styles.grid}>
                <Text style={styles.title}>{t('complianceReport.withdrawal')}</Text>
                <Text style={styles.titleBold}>
                  {depositData.amount - fee} {token}
                </Text>
              </View>
              <View style={styles.grid}>
                <Text style={styles.subtitle}>{t('complianceReport.verified')}</Text>
                <Text style={styles.subtitle}>
                  {t('complianceReport.relayerFee', { fee: `${fee} ${token}` })}
                </Text>
              </View>
              <View style={styles.transactionRow}>
                <Text style={styles.label}>{t('complianceReport.date')}</Text>
                <Text style={styles.value}>
                  {formatDateUTC(withdrawalData.withdrawalBlock.timestamp * 1000)}
                </Text>
              </View>
              <View style={styles.transactionRow}>
                <Text style={styles.label}>{t('complianceReport.transaction')}</Text>
                <Link
                  href={`${scanUrl}/tx/${withdrawalData.withdrawal.transactionHash}`}
                  style={styles.value}>
                  {insertAt(withdrawalData.withdrawal.transactionHash, '\n', 42)}
                </Link>
              </View>
              <View style={styles.transactionRow}>
                <Text style={styles.label}>{t('complianceReport.to')}</Text>
                <Link
                  href={`${scanUrl}/address/${withdrawalData.withdrawal.returnValues.to}`}
                  style={styles.value}>
                  {withdrawalData.withdrawal.returnValues.to}
                </Link>
              </View>
              <View style={styles.transactionRow}>
                <Text style={styles.label}>{t('complianceReport.nullifierHash')}</Text>
                <Text style={styles.value}>
                  {insertAt(withdrawalData.withdrawal.returnValues.nullifierHash, '\n', 42)}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.warning}>
            <Text style={styles.title}>{t('complianceReport.warning')}</Text>
            <Text style={styles.warningContent}>{t('complianceReport.warningText')}</Text>
          </View>
        </Page>
      </Document>
    );
  };

  return (
    <div className={classes.container}>
      <PDFDownloadLink fileName={fileName} document={renderReport()}>
        <Button variant="outlined" color="primary" className={classes.button} disableFocusRipple>
          {t('generatePdfReport')}
        </Button>
      </PDFDownloadLink>
    </div>
  );
};
