import { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { PasswordTextFieldProps, RefInputFieldProps } from '../../interfaces/Auth.interface';

export const PasswordTextField: React.FC<PasswordTextFieldProps> = ( {
  placeholder,
  name,
  value,
  onChange,
  helperText,
  error
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
      value={value}
      name={name}
      onChange={onChange}
      error={error}
      helperText={helperText}
      autoComplete="new-password"
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


export const RefPasswordTextField: React.FC<RefInputFieldProps> = ( {
  placeholder,
  inputRef,
  helperText,
  error,
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
      error={error}
      helperText={helperText}
      inputRef={inputRef}
      autoComplete="new-password"
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

