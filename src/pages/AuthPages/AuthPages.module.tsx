import { useTheme, Theme } from '@mui/material/styles';

const SignUpPageStyle = () => {
  const theme: Theme = useTheme();
  return {
    container: {
      display: 'flex',
      height: '100vh',
      justifyContent: 'space-between',
      alignItems: { xs: 'center', md: 'normal' },
      flexDirection: { xs: 'column', md: 'row' },

    },
    signup_form_container: {
      margin: '48px 56px 0px 48px',
      flex: 1,
      maxWidth: '530px',
      minWidth: '300px,'
    },
    image_slider_container: {
      flex: 1,
      display: { xs: 'none', md: 'block' }
    },
    logo: {
      width: '150px',
      height: '60px',
    },
    login_style: {
      color: theme.palette.primary.main,
      paddingLeft: '4px',
      textDecoration: 'none',
    }
  };
};

export default SignUpPageStyle;
