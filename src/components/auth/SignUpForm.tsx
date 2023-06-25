import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import PasswordTextField from './PasswordTextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputField from './InputField';
import ProfessionSelectField from './ProfessionSelectField';
import Button from '@mui/material/Button';
import { SelectChangeEvent } from '@mui/material/Select';
import { SignUpData, INITIAL_SIGN_UP_DATA } from '../../interfaces/user';

const SignUpForm: React.FC = () => {
  const [ signUpData, setSignUpData ] = useState<SignUpData>( INITIAL_SIGN_UP_DATA );

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

  const handleInputChange = ( event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[]> ) => {
    const { name, value } = event.target;
    setSignUpData( ( prevData ) => ( {
      ...prevData,
      [ name ]: value,
    } ) );
  };

  const handleSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    console.log( signUpData );
    setSignUpData( INITIAL_SIGN_UP_DATA );
  };
  return (
    <Stack component='form' mt='32px' direction='column' spacing='16px' onSubmit={handleSubmit}>
      <Stack direction='row' spacing='8px'>
        <InputField placeholder='First Name' name='first_name' value={signUpData.first_name} onChange={handleInputChange} />
        <InputField placeholder='Last Name' name='last_name' value={signUpData.last_name} onChange={handleInputChange} />
      </Stack>
      <InputField placeholder='Email' name='email' value={signUpData.email} onChange={handleInputChange} />
      <PasswordTextField placeholder='Password' name='password' value={signUpData.password} onChange={handleInputChange} />
      <PasswordTextField placeholder='Confirm Password' name='confirm_password' value={signUpData.confirm_password} onChange={handleInputChange} />
      <InputField placeholder='username' startAdornment='@' name='username' value={signUpData.username} onChange={handleInputChange} />
      <ProfessionSelectField placeholder='Professions' name='professions' value={signUpData.professions} onChange={handleProfessionChange} handleCheckboxChange={handleCheckboxChange} />
      <InputField placeholder='Birth Date' type='date' name='birth_date' value={signUpData.birth_date} onChange={handleInputChange} />
      <FormControlLabel
        control={<Checkbox
          name="news_letter" checked={signUpData.news_letter} onChange={( e ) => setSignUpData( ( prevData ) => ( { ...prevData, news_letter: e.target.checked } ) )}
        />}
        label="Get useful tips and updates via email"
      />
      <Button variant='contained' size='large' type='submit'>Join Now</Button>
    </Stack>
  );
};

export default SignUpForm;
