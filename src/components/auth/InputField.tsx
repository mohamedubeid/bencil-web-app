import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

interface InputFieldProps {
  type?: string;
  placeholder: string;
  startAdornment?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ( {
  type,
  placeholder,
  startAdornment,
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
    />
  );
};

export default InputField;
