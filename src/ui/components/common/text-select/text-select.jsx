// const styles = ({ colors }) => ({
//   formControl: {
//     width: '100%',
//   },
//   label: {
//     color: colors.DARK_WHITE,
//     display: 'block',
//     fontFamily: '"PT mono", monospace',
//     fontSize: '1rem',
//     marginBottom: '.5em',
//     lineHeight: 1.5,
//     position: 'relative',
//     transform: 'none',
//     '&.MuiInputLabel-shrink': {
//       transform: 'none',
//     },
//     '&.Mui-focused': {
//       color: colors.DARK_WHITE,
//     },
//   },
//   menu: {
//     marginTop: 4,
//   },
//   progressIcon: {
//     color: colors.GREY,
//   },
// });

export const TextSelect = ({ label, options, loading, ...rest }) => {
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      {label ? <InputLabel className={classes.label}>{label}</InputLabel> : ''}
      <Select
        defaultValue={options[0].name}
        MenuProps={{
          TransitionComponent: Fade,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
          className: classes.menu,
        }}
        IconComponent={ExpandMore}
        {...rest}>
        {options.map(option => (
          <MenuItem key={option.id} value={option.name} className={classes.menuItem}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
