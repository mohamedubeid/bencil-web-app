import { Box, Typography, Button, Stack } from "@mui/material";
import AuthPagesStyle from "./AuthPages.module"
import ImageSlider from '../../components/imageSlider/ImageSlider';
import InputField from "../../components/auth/InputField";
import { useState } from "react";

const ForgetPasswordPage: React.FC = () => {
  const classes = AuthPagesStyle();
  const [ email, setEmail ] = useState( '' );

  return (
    <Box sx={classes.container}>
      <Box sx={classes.form_container}>
        <img src="/images/logo.svg" alt="bencil-logo" style={classes.logo} />
        <Typography variant="h1" mt='80px' textAlign='center' > Forget Password?</Typography>
        <Typography variant="subtitle2" textAlign='center' color='secondary.dark'>Not to worry, we got you! Let's get you a new password.</Typography>
        <Stack direction='column' mt={4} spacing={4}>
          <InputField
            placeholder='Please enter your registered email.'
            name='email'
            value={email}
            onChange={( e: React.ChangeEvent<HTMLInputElement> ) => { setEmail( e.target.value ) }}
          // error={!!validationError?.email}
          // helperText={validationError?.email || ''}
          />
          <Button variant='contained' size='large' type='submit' >Reset password</Button>

        </Stack>
      </Box>
      <Box sx={classes.image_slider_container}>
        <ImageSlider />
      </Box>
    </Box>

  )
}

export default ForgetPasswordPage