import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import { PasswordTextField } from '../ui/inputs';
import FormControlLabel from '@mui/material/FormControlLabel';
import { InputField } from '../ui/inputs';
import { ProfessionSelectField } from '../ui/inputs';
import Button from '@mui/material/Button';
import { SelectChangeEvent } from '@mui/material/Select';
import { SingUpForm, INITIAL_SIGN_UP_DATA, LocationState } from './interfaces';
import SignUpDataSchema from '../../schema/SignUp.schema';
import { useRouter } from '../../routes/hooks';

interface SignUpFormProps {
  formData: SingUpForm | undefined;
}

const SignUpForm: React.FC<SignUpFormProps> = ( { formData } ) => {

  const router = useRouter();

  const [ signUpData, setSignUpData ] = useState<SingUpForm>( INITIAL_SIGN_UP_DATA );

  const [ validationError, setValidationError ] = useState<{ [ key: string ]: string } | undefined>( undefined );


  const handleProfessionChange = (
    event: SelectChangeEvent<string[]>
  ) => {
    setSignUpData( ( prevData ) => {
      return {
        ...prevData,
        professions: event.target.value as string[] || []
      }
    } )
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    profession: string
  ) => {
    const isChecked = event.target.checked;
    setSignUpData( ( prevState ) => {
      if ( isChecked ) {
        return {
          ...prevState,
          professions: [ ...prevState.professions, profession ]
        };
      } else {
        return {
          ...prevState,
          professions: prevState.professions.filter(
            ( selectedProfession ) => selectedProfession !== profession
          )
        };
      }
    } );
  };

  const handleInputChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = event.target;
    setSignUpData( ( prevData ) => ( {
      ...prevData,
      [ name ]: value,
    } ) );
  };

  const handleSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    // console.log( { ...signUpData, username: `@${signUpData.username}` } );
    try {
      const { error } = SignUpDataSchema.validate( signUpData, {
        abortEarly: false,
      } );
      if ( !error ) {
        setValidationError( undefined );
        setSignUpData( INITIAL_SIGN_UP_DATA );
        const data = {...signUpData, username: `@${signUpData.username}`} as SingUpForm;
        router.push('/auth/verify-email', {state: {data} } as LocationState);
        return;
      } else {
        const newErrors: { [ key: string ]: string } = {};
        error.details.forEach( ( detail ) => {
          const path = detail.path[ 0 ] as keyof SingUpForm;
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

  useEffect( () => {
    if ( formData !== undefined ) {
      setSignUpData( formData )
    }
  }, [ formData ] )
  return (
    <Stack component='form' mt='24px' direction='column' spacing='12px' onSubmit={handleSubmit}>
      <Stack direction='row' spacing='8px'>
        <InputField
          placeholder='First Name'
          name='first_name'
          value={signUpData.first_name}
          onChange={handleInputChange}
          error={!!validationError?.first_name}
          helperText={validationError?.first_name || ''}/>
        <InputField
          placeholder='Last Name'
          name='last_name'
          value={signUpData.last_name}
          onChange={handleInputChange}
          error={!!validationError?.last_name}
          helperText={validationError?.last_name || ''}/>
      </Stack>
      <InputField
        placeholder='Email'
        name='email'
        value={signUpData.email}
        onChange={handleInputChange}
        error={!!validationError?.email}
        helperText={validationError?.email || ''}/>
      <PasswordTextField
        placeholder='Password'
        name='password'
        value={signUpData.password}
        onChange={handleInputChange}
        error={!!validationError?.password}
        helperText={validationError?.password || ''} />
      <PasswordTextField
        placeholder='Confirm Password'
        name='confirm_password'
        value={signUpData.confirm_password}
        onChange={handleInputChange}
        error={!!validationError?.confirm_password}
        helperText={validationError?.confirm_password || ''} />
      <InputField
        placeholder='username'
        startAdornment='@'
        name='username'
        value={signUpData.username}
        onChange={handleInputChange}
        error={!!validationError?.username}
        helperText={validationError?.username || ''} />
      <ProfessionSelectField
        placeholder='Professions'
        name='professions'
        value={signUpData.professions}
        onChange={handleProfessionChange}
        handleCheckboxChange={handleCheckboxChange}
        error={!!validationError?.professions}
        helperText={validationError?.professions || ''}/>
      <InputField
        placeholder='Birth Date'
        type='date'
        name='birth_date'
        value={signUpData.birth_date}
        onChange={handleInputChange}
        error={!!validationError?.birth_date}
        helperText={validationError?.birth_date || ''} />
      <FormControlLabel
        control={<Checkbox
          name="news_letter"
          checked={signUpData.news_letter}
          onChange={( e ) => setSignUpData( ( prevData ) => ( { ...prevData, news_letter: e.target.checked } ) )}
        />}
        label="Get useful tips and updates via email"
      />
      <Button variant='contained' size='large' type='submit'>Join Now</Button>
    </Stack>
  );
};

export default SignUpForm;
