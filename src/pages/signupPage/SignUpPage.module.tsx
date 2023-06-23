import { useTheme, Theme } from '@mui/material/styles';

const SignUpPageStyle = () => {
  const theme: Theme = useTheme();
  console.log( theme.palette, 'theme theme theme ' )
  return {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      height: '100vh',
      alignItems: { xs: 'center', md: 'normal' },
      flexDirection: { xs: 'column', md: 'row' },
    },
    signup_form_container: {
      padding: '8px 8px 8px 32px',
    },
    logo: {
      width: '150px',
      height: '60px',
      marginBottom: '0px'
    },
    login_style: {
      color: theme.palette.primary.main,
      paddingLeft: '4px',
      textDecoration: 'none',
    }
  };
};

export default SignUpPageStyle;
