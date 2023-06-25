import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { InputFieldProps } from '../../interfaces/auth.interface';

const InputField: React.FC<InputFieldProps> = ( {
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

export default InputField;
