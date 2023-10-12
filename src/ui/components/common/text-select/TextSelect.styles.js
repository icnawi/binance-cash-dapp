const styles = ({ colors }) => ({
  formControl: {
    width: '100%',
  },
  label: {
    color: colors.DARK_WHITE,
    display: 'block',
    fontFamily: '"PT mono", monospace',
    fontSize: '1rem',
    marginBottom: '.5em',
    lineHeight: 1.5,
    position: 'relative',
    transform: 'none',
    '&.MuiInputLabel-shrink': {
      transform: 'none',
    },
    '&.Mui-focused': {
      color: colors.DARK_WHITE,
    },
  },
  menu: {
    marginTop: 4,
  },
  progressIcon: {
    color: colors.GREY,
  },
});

export const useStyles = makeStyles(styles, { name: 'TextSelect' });
