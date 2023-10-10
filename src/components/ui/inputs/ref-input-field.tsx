import TextField from '@mui/material/TextField';
import { RefInputFieldProps } from '../../auth/interfaces';

const RefInputField: React.FC<RefInputFieldProps> = ( {
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

export default RefInputField;