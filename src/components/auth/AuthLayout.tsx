import Box from "@mui/material/Box";
import AuthLayoutStyle from "./AuthLayout.module"
import ImageSlider from '../../components/imageSlider/ImageSlider';
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const classes = AuthLayoutStyle()
  return (
    <Box sx={classes.container}>
      <Box sx={classes.form_container}>
        <img src="/images/logo.svg" alt="bencil-logo" style={classes.logo} />
        <Outlet />
      </Box>
      <Box sx={classes.image_slider_container}>
        <ImageSlider />
      </Box>
    </Box>
  )
}

export default AuthLayout