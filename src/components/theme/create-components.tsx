export const createComponents = () => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600
        },
        sizeLarge: {
          fontWeight: '700',
          fontSize: '15px',
          width: '100%'
        },
        // sizeMedium: {
        //   fontSize: 14
        // },
        // sizeSmall: {
        //   fontSize: 13
        // },
        // contained: {
        //   // '&:focus': {
        //   // boxShadow: `${alpha(palette.primary.main, 0.25)} 0 0 0 0.2rem`
        //   // }
        // }
      }
    }
  }

}