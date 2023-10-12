const styles = ({ colors }) => ({
  textField: {
    width: '100%',
  },
  field: {
    marginBottom: '1.25rem',
  },
  label: {},
  labelContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '.5rem',
  },
  labelWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  input: {
    height: '2.857em',
    overflow: 'hidden',
    minHeight: '1.1876em',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  optionIcon: {
    color: colors.PRIMARY,
    cursor: 'pointer',
    width: 24,
    marginLeft: '.25rem',
    '&:hover': {
      color: colors.ACTIVE_PRIMARY,
    },
  },
  noteInfoContainer: {
    width: '100%',
    fontSize: '.85rem',
    lineHeight: 1,
    marginTop: '1.25rem',
  },
  noteRow: {
    display: 'flex',
    justifyContent: 'space-between',
    '& + &': {
      marginTop: '.6rem',
    },
  },
  rowValue: {
    color: colors.PRIMARY,
  },
});

export const useStyles = makeStyles(styles, { name: 'Note' });
