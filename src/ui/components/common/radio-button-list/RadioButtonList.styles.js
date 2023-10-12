const styles = ({ colors }) => ({
  formControl: {
    width: '100%',
    marginBottom: '1.25rem',
  },
  formControlLabel: {
    flexGrow: '1',
    justifyContent: 'space-between',
    marginLeft: 0,
    '& .MuiFormControlLabel-label': {
      fontFamily: '"PT mono", monospace',
      fontSize: '12px',
      fontWeight: 300,
    },
  },
  radio: {
    display: 'flex',
    color: colors.PRIMARY,
    '&.Mui-checked:hover, &:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-checked ~ .MuiFormControlLabel-label': {
      color: colors.PRIMARY,
    },
    '& .MuiIconButton-label': {
      background: colors.BACKGROUND,
      width: '18px',
    },
  },
});

export const useStyles = makeStyles(styles, { name: 'RadioButtonList' });
