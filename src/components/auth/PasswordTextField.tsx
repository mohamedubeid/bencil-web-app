import { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface PasswordTextFieldProps {
  placeholder: string;
  // name: string;
  // value: string;
  // onChange: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
}

const PasswordTextField: React.FC<PasswordTextFieldProps> = ( {
  placeholder,
  // name,
  // value,
  // onChange
} ) => {
  const [ showPassword, setShowPassword ] = useState( false );
  const handleClickShowPassword = () => setShowPassword( !showPassword );

  return (
    <TextField
      fullWidth
      size='small'
      placeholder={placeholder}
      variant="outlined"
      type={showPassword ? 'text' : 'password'}
      // value={ value }
      // name={ name }
      // onChange={ onChange }
      InputProps={{
        endAdornment: (
          <IconButton onClick={handleClickShowPassword} edge="end">
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        ),
      }}
    />
  );
};

export default PasswordTextField;