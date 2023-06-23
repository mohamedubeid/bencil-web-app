import { Theme } from '@mui/material/styles';
import { createTheme as createMuiTheme } from '@mui/material/styles';
import { createTypography } from './create-typography';
import { createComponents } from './create-components';
import { error, info, primary, secondary, success, warning } from './colors'
export function createTheme(): Theme {
  const typography: any = createTypography();
  const components = createComponents();
  return createMuiTheme( {
    typography,
    components,
    palette: {
      primary,
      info,
      error,
      success,
      warning,
      secondary
    }
  } );
}