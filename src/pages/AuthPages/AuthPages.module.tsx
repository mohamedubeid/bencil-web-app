import { useTheme, Theme } from '@mui/material/styles';

const AuthPagesStyle = () => {
  const theme: Theme = useTheme();
  return {
    container: {
      display: 'flex',
      height: '100vh',
      justifyContent: 'space-between',
      alignItems: { xs: 'center', md: 'normal' },
      flexDirection: { xs: 'column', md: 'row' },

    },
    form_container: {
      margin: '32px 32px 0px 32px',
      flex: 1,
      maxWidth: '530px',
      minWidth: '300px,'
    },
    image_slider_container: {
      flex: 1,
      display: { xs: 'none', md: 'block' }
    },
    logo: {
      width: '130px',
    },
    login_style: {
      color: theme.palette.primary.main,
      paddingLeft: '4px',
      textDecoration: 'none',
    },
    verify_input: {
      width: '70px',
      margin: 1,
      '& input': {
        textAlign: 'center',
        fontSize: '1.5rem',
        zIndex: 1
      },
      ' .MuiOutlinedInput-notchedOutline': {
        borderRadius: '25px',
        background: theme.palette.secondary.light,
      }
    }
  };
};

export default AuthPagesStyle;
