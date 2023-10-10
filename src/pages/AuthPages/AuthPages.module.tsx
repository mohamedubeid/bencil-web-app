import { useTheme, Theme } from '@mui/material/styles';

const AuthPagesStyle = () => {
  const theme: Theme = useTheme();
  return {
    logo: {
      width: '130px',
    },
    navigate_style: {
      color: theme.palette.primary.main,
      paddingLeft: '4px',
      textDecoration: 'none',
    },
    verify_page_container: {
      textAlign: 'center',
    },
    verify_action: {
      marginTop: '40px',
      alignItems: 'center',
      justifyContent: 'start',
      gap: '8px'
    },
    verify_title: {
      color: theme.palette.primary.main,
      marginBottom: '64px',
    },
    continue_button: {
      background: theme.palette.secondary.light,
      color: '#000000bb',
      '&:hover': {
        background: theme.palette.secondary.light,
      }
    },
    get_another_code: {
      color: theme.palette.secondary.main,
      textDecoration: 'underLine',
      fontSize: '20px',
      fontWeight: 700,
      padding: 0,
      margin: 0,
      marginLeft: '4px',
      '&:active': {
        color: theme.palette.secondary.dark,
        textDecoration: 'underLine'
      }
    },
    activated_stepper: {
      width: { xs: '60px', sm: '80px' },
      height: '4px',
      borderRadius: '30px',
      backgroundColor: theme.palette.primary.main,
    },
    disabled_stepper: {
      width: { xs: '50px', sm: '80px' },
      height: '4px',
      borderRadius: '30px',
      backgroundColor: theme.palette.secondary.main,
    }
  };
};

export default AuthPagesStyle;
