import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {theme, ThemeHelmet} from '../src/themes/main.theme';

const Persist = ({children}) =>
<div>
  <ThemeHelmet />
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
</div>

export default Persist;