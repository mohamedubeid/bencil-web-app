import React, { useState } from 'react';
import { Button,/* Checkbox, FormControlLabel, */ Stack} from '@mui/material';
import { InputField } from '../ui/inputs';
import { PasswordTextField } from '../ui/inputs'
import { INITIAL_LOG_IN_DATA, LoginDataType, } from './interfaces';
import LoginDataSchema from '../../schema/LogIn.schema';
// import { Link } from '@mui/material';
// import { RouterLink } from '../../routes/components';
import { useSearchParams, useRouter } from '../../routes/hooks';
import { paths } from '../../routes/paths';

const LoginForm: React.FC = () => {

  const router = useRouter();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const [ logInData, setLogInData ] = useState<LoginDataType>( INITIAL_LOG_IN_DATA );

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
    try {
      //check validation - done
      const { error } = LoginDataSchema.validate( logInData, { 
        abortEarly: false,
      } );
      if ( !error ) {
        setValidationError( undefined );
        //save login data in local storage
        setLogInData( INITIAL_LOG_IN_DATA );
        // router.replace(paths.root);
        //navigate to the root (home) page
        router.replace(returnTo || paths.root);
        return;
      } else {
        const newErrors: { [ key: string ]: string } = {};
        error.details.forEach( ( detail ) => {
          const path = detail.path[ 0 ] as keyof LoginDataType;
          const message = detail.message;
          newErrors[ path ] = message;
        } );
        setValidationError( newErrors );
        return;
      }
    } catch ( error ) {
      console.log( error );
    }
  };

  return (
    <Stack component='form' mt='24px' direction='column' spacing='32px' onSubmit={handleSubmit} width='100%'>
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
            <Button variant='contained' size='large' type='submit' >Let's Go</Button>

      {/* <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='space-between' alignItems={{ xs: 'start', sm: 'center' }} spacing='16px'>
        <FormControlLabel
          control={<Checkbox
            name="news_letter"
            checked={logInData.remember_me}
            onChange={( e ) => setLogInData( ( prevData ) => ( { ...prevData, remember_me: e.target.checked } ) )}
          />}
          label="Remember me"
        />
        <Link component={RouterLink} to={paths.auth.forgotPassword} >Forgot Password?</Link>
      </Stack> */}
    </Stack >
  )
}

export default LoginForm;