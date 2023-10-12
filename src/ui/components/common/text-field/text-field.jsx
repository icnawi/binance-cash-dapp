import { Controller } from 'react-hook-form';

import { Tooltip } from '../tooltip/tooltip.jsx';

export const TextField = ({
  control,
  name,
  defaultValue = '',
  placeholder,
  label,
  fullWidth,
  helperText,
  error,
  tooltipText,
  classes,
  onChange = () => {},
}) => (
  <>
    {label ? (
      <div className={classes?.labelContainer}>
        <InputLabel className={classes?.label}>{label}</InputLabel>
        {tooltipText ? <Tooltip placement="right" title={tooltipText} width={180} /> : null}
      </div>
    ) : (
      ''
    )}
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <OutlinedInput
          placeholder={placeholder}
          fullWidth={fullWidth}
          error={error}
          className={classes?.input}
          {...field}
          onChange={e => {
            field.onChange(e.target.value);
            onChange(e.target.value);
          }}
        />
      )}
    />
    {helperText ? <FormHelperText error={error}>{helperText}</FormHelperText> : null}
  </>
);
