import { useTranslation } from 'react-i18next';

// const mrMixin = () => ({ marginRight: '.5rem' });
// const mbMixin = () => ({ marginBottom: '.5rem' });
// const btnMixin = () => ({
//   lineHeight: 1.5,
//   fontSize: '.75rem',
//   minWidth: 0,
//   height: '2.857em',
// });

// const styles = ({ colors }) => ({
//   container: {
//     display: 'flex',
//     marginBottom: 0,
//   },
//   text: {
//     fontSize: '.75rem',
//     lineHeight: 1.5,
//     marginBottom: '.5rem',
//     marginRight: '1rem',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//   },
//   buttonGroup: {
//     ...mbMixin(),
//     '&:not(:last-child)': {
//       ...mrMixin(),
//     },
//   },
//   currencyButton: {
//     ...mbMixin(),
//     ...btnMixin(),
//     '&:not(:last-child)': {
//       ...mrMixin(),
//     },
//   },
//   divider: {
//     margin: '0 1rem .5rem .5rem',
//     backgroundColor: colors.PRIMARY,
//     height: 'inherit',
//   },
//   filterGroupButton: {
//     ...btnMixin(),
//   },
// });
export const FilterPanel = () => {
  const { t } = useTranslation();
  const token = useStoreState(state => state.common.tokenConfig.token);
  return (
    <div className={classes.container}>
      <Text variant="body2" display="block" className={classes.text}>
        {t('filterBy')}
      </Text>
      <Button
        className={classes.currencyButton}
        variant="outlined"
        color="primary"
        disableRipple
        disableFocusRipple
        disableTouchRipple>
        {token}
      </Button>
      <Divider variant="fullWidth" orientation="vertical" className={classes.divider} />
      <ButtonGroup variant="outlined" className={classes.buttonGroup}>
        <Button
          className={classes.filterGroupButton}
          variant="outlined"
          color="primary"
          disableRipple
          disableFocusRipple
          disableTouchRipple>
          {t('spent')}
        </Button>
        <Button
          className={classes.filterGroupButton}
          variant="outlined"
          color="primary"
          disableRipple
          disableFocusRipple
          disableTouchRipple>
          {t('unspent')}
        </Button>
      </ButtonGroup>
      <Divider variant="fullWidth" orientation="vertical" className={classes.divider} />
      <ButtonGroup variant="outlined" className={classes.buttonGroup}>
        <Button
          className={classes.filterGroupButton}
          variant="outlined"
          color="primary"
          disableRipple
          disableFocusRipple
          disableTouchRipple>
          {t('regular')}
        </Button>
        <Button
          className={classes.filterGroupButton}
          variant="outlined"
          color="primary"
          disableRipple
          disableFocusRipple
          disableTouchRipple>
          {t('encrypted')}
        </Button>
      </ButtonGroup>
    </div>
  );
};
