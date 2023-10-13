import { formatTokenAmount } from '../../../../utils';
import { Tooltip } from '../tooltip/tooltip.jsx';

// const styles = ({ colors }) => ({
//   formControl: {
//     width: '100%',
//     marginBottom: '1.25rem',
//   },
//   formControlLabel: {
//     flexGrow: '1',
//     textAlign: 'center',
//     '& .MuiFormControlLabel-label': {
//       fontFamily: '"PT mono", monospace',
//       fontSize: '12px',
//       fontWeight: 600,
//     },
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
//   radio: {
//     display: 'flex',
//     color: colors.PRIMARY,
//     '&.Mui-checked:hover, &:hover': {
//       backgroundColor: 'transparent',
//     },
//     '&.Mui-checked ~ .MuiFormControlLabel-label': {
//       color: colors.PRIMARY,
//     },
//     '& .MuiIconButton-label': {
//       background: colors.BACKGROUND,
//       width: '18px',
//     },
//   },
//   radioGroup: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     position: 'relative',
//     width: '100%',
//     '&::before': {
//       content: '""',
//       display: 'block',
//       height: '2px',
//       position: 'absolute',
//       width: '100%',
//       top: '18px',
//       backgroundColor: colors.PRIMARY,
//     },
//   },
// });
export const RadioButtonGroup = ({ classNames, label, options, value, onChange, tooltipText }) => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      {label ? (
        <div className={classNames?.amountLabel}>
          <InputLabel className={classes.label}>{label}</InputLabel>
          <Tooltip placement="right" title={tooltipText} width={180} />
        </div>
      ) : (
        ''
      )}

      <RadioGroup className={classes.radioGroup}>
        {options.map(option => (
          <FormControlLabel
            key={option.id}
            onChange={() => onChange(option.value)}
            className={classes.formControlLabel}
            value={option.value}
            control={<Radio color="primary" className={classes.radio} disableRipple />}
            label={`${formatTokenAmount(option.value)} ${option.label}`}
            labelPlacement="bottom"
            checked={option.value === value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
