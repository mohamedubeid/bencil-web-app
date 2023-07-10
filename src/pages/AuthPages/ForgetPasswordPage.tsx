import { Box, Typography, Button, Stack } from "@mui/material";
import InputField from "../../components/auth/InputField";
import { useState } from "react";

const ForgetPasswordPage: React.FC = () => {
  const [ email, setEmail ] = useState( '' );

  return (
    <Box>
      <Typography variant="h1" mt='80px' textAlign='center' > Forget Password?</Typography>
      <Typography variant="subtitle2" textAlign='center' color='secondary.dark'>Not to worry, we got you! Let's get you a new password.</Typography>
      <Stack direction='column' mt={4} spacing={4}>
        <InputField
          placeholder='Please enter your registered email.'
          name='email'
          value={email}
          onChange={( e: React.ChangeEvent<HTMLInputElement> ) => { setEmail( e.target.value ) }}
        // error={!!validationError?.email} //check if the email form correct then make sure that the email is exist in out database
        // helperText={validationError?.email || ''}
        />
        <Button variant='contained' size='large' type='submit' >Reset password</Button>
      </Stack>
    </Box>

  )
}

export default ForgetPasswordPage