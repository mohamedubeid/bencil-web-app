const AuthLayoutStyle = () => {
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
  }
}

export default AuthLayoutStyle;
