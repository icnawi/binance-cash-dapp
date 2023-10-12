const styles = {
  form: {
    width: '100%',
  },
  title: {
    marginBottom: '.5rem',
  },
  description: {
    marginTop: 25,
    fontSize: 14,
  },
  textFieldInputRoot: {
    borderRadius: 8,
    fontWeight: 900,
    backgroundColor: '#eaeaea',
  },

  tokenField: {
    width: '100%',
  },
  tokenInput: {
    fontSize: 16,
  },
  amountField: {
    width: '50%',
  },
  amountLabel: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '.5rem',
    '& .MuiFormLabel-root': {
      marginBottom: 0,
    },
  },
  submitButton: {
    fontSize: 14,
    width: '100%',
    display: 'flex',
  },
  depositForm: {
    width: '100%',
  },
  depositField: {
    marginBottom: '1.25rem',
    '&.amount': {
      marginBottom: 0,
    },
  },
};

export const useStyles = makeStyles(styles, { name: 'Deposit' });
