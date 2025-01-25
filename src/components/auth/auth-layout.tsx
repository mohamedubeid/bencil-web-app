import { ReactNode } from 'react';
import Box from "@mui/material/Box";
import AuthLayoutStyle from "./auth-layout.module"
import { ImageSlider } from '../slider';
import Logo from '../logo/Logo';

const AuthLayout: React.FC<{ children: ReactNode }> = ({children}) => {
  const classes = AuthLayoutStyle()
  return (
    <Box sx={classes.container}>
      <Box sx={classes.form_container}>
        <Logo sx={classes.logo}/>
        {children}
      </Box>
      <Box sx={classes.image_slider_container}>
        <ImageSlider />
      </Box>
    </Box>
  )
}

export default AuthLayout;