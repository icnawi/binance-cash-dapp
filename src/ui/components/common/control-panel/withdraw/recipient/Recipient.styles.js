const styles = ({ colors }) => ({
  textField: {
    width: '100%',
    height: 'auto',
    overflow: 'hidden',
    minHeight: '1.1876em',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  field: {
    marginBottom: '1.25rem',
  },
  label: {},
  labelContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '.5rem',
    justifyContent: 'space-between',
  },
  input: {
    height: '2.857em',
    overflow: 'hidden',
    minHeight: '1.1876em',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    marginBottom: '.8rem',
  },

  donate: {
    color: colors.PRIMARY,
    padding: 0,
    height: 'auto',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: `1px dotted ${colors.PRIMARY}`,
    borderRadius: 0,
    fontSize: '.85rem',
    lineHeight: 1,
    minWidth: 0,
  },
});

export const useStyles = makeStyles(styles, { name: 'Recipient' });
