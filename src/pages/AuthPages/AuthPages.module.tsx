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
      height: '100vh',
      padding: { xs: '40px', md: '56px' },
      flex: 1,
      maxWidth: '530px',
    },
    image_slider_container: {
      height: '100vh',
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
    verify_outer_container: {
      padding: { padding: '32px 0 0 24px' },
    },
    verify_page_container: {
      textAlign: 'center',
      margin: 'auto',
      padding: '40px',
      maxWidth: '680px'
    },
    verify_action: {
      marginTop: '40px',
      paddingLeft: '20px',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'start',
      gap: '8px'
    },
    verify_title: {
      color: theme.palette.primary.main,
      marginBottom: '64px',
    },
    verify_button: {
      width: '90px',
      padding: '8px'
    },
    continue_button: {
      padding: '8px',
      background: theme.palette.secondary.light,
      color: '#000000bb',
      '&:hover': {
        background: theme.palette.secondary.light,
      }
    },
    get_another_code: {
      color: theme.palette.secondary.main,
      fontSize: '20px',
      fontWeight: 700,
      padding: 0,
      margin: 0,
      marginLeft: '4px',
      '&:active': {
        color: theme.palette.secondary.dark,
        textDecoration: 'underLine'
      }
    }
  };
};

export default AuthPagesStyle;
