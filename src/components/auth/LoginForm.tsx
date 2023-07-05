import { useState } from 'react'
import { Button, Checkbox, FormControlLabel, Stack } from '@mui/material'
import InputField from './InputField'
import PasswordTextField from './PasswordTextField'
import { INITIAL_LOG_IN_DATA, LogInData, } from '../../interfaces/auth.interface';
import LoginDataSchema from '../../schema/LogIn.schema';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [ logInData, setLogInData ] = useState<LogInData>( INITIAL_LOG_IN_DATA );
  const [ validationError, setValidationError ] = useState<{ [ key: string ]: string } | undefined>( undefined );

  const handleInputChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = event.target;
    setLogInData( ( prevData ) => ( {
      ...prevData,
      [ name ]: value,
    } ) );
  };

  const handleSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    console.log( logInData );
    try {
      const { error } = LoginDataSchema.validate( logInData, {
        abortEarly: false,
      } );
      if ( !error ) {
        setValidationError( undefined );
        setLogInData( INITIAL_LOG_IN_DATA );
        return
      } else {
        const newErrors: { [ key: string ]: string } = {};
        error.details.forEach( ( detail ) => {
          const path = detail.path[ 0 ] as keyof LogInData;
          const message = detail.message;
          newErrors[ path ] = message;
        } );
        setValidationError( newErrors );
        return
      }
    } catch ( error ) {
      console.log( error );
    }
  };

  return (
    <Stack component='form' mt='24px' direction='column' spacing='32px' onSubmit={handleSubmit}>
      <InputField
        placeholder='Email'
        name='email'
        value={logInData.email}
        onChange={handleInputChange}
        error={!!validationError?.email}
        helperText={validationError?.email || ''}
      />
      <PasswordTextField
        placeholder='Password'
        name='password'
        value={logInData.password}
        onChange={handleInputChange}
        error={!!validationError?.password}
        helperText={validationError?.password || ''}
      />
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='space-between' alignItems={{ xs: 'start', sm: 'center' }} spacing='16px'>
        <FormControlLabel
          control={<Checkbox
            name="news_letter"
            checked={logInData.remember_me}
            onChange={( e ) => setLogInData( ( prevData ) => ( { ...prevData, remember_me: e.target.checked } ) )}
          />}
          label="Remember me"
        />
        <Link to='/forget-password'>Forget Password?</Link>
      </Stack>
      <Button variant='contained' size='large' type='submit' >Let's Go</Button>
    </Stack >
  )
}

export default LoginForm