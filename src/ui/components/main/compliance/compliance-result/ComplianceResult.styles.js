const styles = ({ colors }) => ({
  container: {
    marginTop: '1.5rem',
  },
  title: {
    fontFamily: '"PT mono", monospace',
    fontSize: '1.25rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  subtitle: {
    fontFamily: '"PT mono", monospace',
    fontSize: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  success: {
    color: colors.PRIMARY,
  },
  warning: {
    color: colors.WARN,
  },
  dimmed: {
    color: '#616161',
  },
  table: {
    fontFamily: '"PT mono", monospace',
    fontSize: '.9rem',
    marginTop: '2rem',
  },
  tableLabel: {
    width: 120,
    color: colors.DARK_WHITE,
    marginBottom: 10,
  },
  tableValue: {
    color: colors.PRIMARY,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flexGrow: 1,
    width: 'calc(100% - 120px)',
    '& a': {
      color: colors.PRIMARY,
    },
  },
  arrow: {
    color: colors.PRIMARY,
    width: 46,
    display: 'block',
    margin: 'auto',
    '& path': {
      fill: colors.PRIMARY,
    },
  },
  gridItem: {
    width: '45.75%',
  },
  copyButton: {
    cursor: 'pointer',
  },
  alert: {
    margin: '0 20px',
  },
});

export const useStyles = makeStyles(styles, { name: 'ComplianceResult' });
