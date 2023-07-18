import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { InputFieldProps, RefInputFieldProps } from '../../interfaces/auth.interface';

export const InputField: React.FC<InputFieldProps> = ( {
  type,
  placeholder,
  startAdornment,
  name,
  value,
  onChange,
  helperText,
  error
} ) => {
  return (
    <TextField
      fullWidth
      size='small'
      variant="outlined"
      label={type === 'date' ? placeholder : ''}
      InputLabelProps={{
        shrink: true,
      }}
      placeholder={type !== 'date' ? placeholder : ''}
      type={type ? type : 'text'}
      InputProps={{
        startAdornment: startAdornment && (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ),
      }}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    />
  );
};

export const RefInputField: React.FC<RefInputFieldProps> = ( {
  type,
  inputRef,
  placeholder,
  helperText,
  error
} ) => {
  return (
    <TextField
      fullWidth
      size='small'
      variant="outlined"
      label={type === 'date' ? placeholder : ''}
      InputLabelProps={{
        shrink: true,
      }}
      inputRef={inputRef}
      placeholder={type !== 'date' ? placeholder : ''}
      type={type ? type : 'text'}
      error={error}
      helperText={helperText}
    />
  );
};
