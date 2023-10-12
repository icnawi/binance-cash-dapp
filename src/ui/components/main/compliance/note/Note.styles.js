const styles = ({ colors }) => ({
  labelContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '.5rem',
  },
  label: {
    fontFamily: '"PT mono", monospace',
    color: colors.DARK_WHITE,
  },
  input: {
    height: '2.857em',
    overflow: 'hidden',
    minHeight: '1.1876em',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
});

export const useStyles = makeStyles(styles, { name: 'ComplianceNote' });
