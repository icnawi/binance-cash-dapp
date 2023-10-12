const styles = ({ colors }) => ({
  checkbox: {
    color: colors.PRIMARY,
  },
  checkboxLabel: {
    margin: '.5rem 0',
  },
  copyButton: {
    fontSize: '10px',
    marginLeft: 8,
    minWidth: 18,
    padding: '4px 0',
    width: 18,
  },
  copyIcon: {
    fontSize: '10px',
  },
  note: {
    margin: '1rem 0',
    wordBreak: 'break-all',
  },
  submitButton: {
    fontSize: 14,
    width: '100%',
  },
});

export const useStyles = makeStyles(styles, { name: 'SubmitDepositModal' });
