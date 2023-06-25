import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

interface InputFieldProps {
  type?: string;
  placeholder: string;
  startAdornment?: React.ReactNode;
  name: string;
  value: string;
  onChange: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
}

const InputField: React.FC<InputFieldProps> = ( {
  type,
  placeholder,
  startAdornment,
  name,
  value,
  onChange
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
    />
  );
};

export default InputField;
