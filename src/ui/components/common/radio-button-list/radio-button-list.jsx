import { useStyles } from './RadioButtonList.styles';

export const RadioButtonList = ({ options, value, onChange }) => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <RadioGroup>
        {options.map(option => (
          <FormControlLabel
            key={option.id}
            onChange={() => onChange(option.value)}
            className={classes.formControlLabel}
            value={option.value}
            control={<Radio color="primary" className={classes.radio} disableRipple />}
            label={option.label}
            labelPlacement="start"
            checked={option.value === value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
