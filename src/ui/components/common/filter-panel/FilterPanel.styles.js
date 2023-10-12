const mrMixin = () => ({ marginRight: '.5rem' });
const mbMixin = () => ({ marginBottom: '.5rem' });
const btnMixin = () => ({
  lineHeight: 1.5,
  fontSize: '.75rem',
  minWidth: 0,
  height: '2.857em',
});

const styles = ({ colors }) => ({
  container: {
    display: 'flex',
    marginBottom: 0,
  },
  text: {
    fontSize: '.75rem',
    lineHeight: 1.5,
    marginBottom: '.5rem',
    marginRight: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonGroup: {
    ...mbMixin(),
    '&:not(:last-child)': {
      ...mrMixin(),
    },
  },
  currencyButton: {
    ...mbMixin(),
    ...btnMixin(),
    '&:not(:last-child)': {
      ...mrMixin(),
    },
  },
  divider: {
    margin: '0 1rem .5rem .5rem',
    backgroundColor: colors.PRIMARY,
    height: 'inherit',
  },
  filterGroupButton: {
    ...btnMixin(),
  },
});

export const useStyles = makeStyles(styles, { name: 'FilterPanel' });
