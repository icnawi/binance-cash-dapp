import { useTranslation } from 'react-i18next';

import { useStyles } from './FilterPanel.styles';

export const FilterPanel = () => {
  const { t } = useTranslation();
  const token = useStoreState(state => state.common.tokenConfig.token);
  const classes = useStyles();
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
