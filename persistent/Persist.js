import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {theme, ThemeHelmet} from '../src/themes/main.theme';

const Persist = ({children}) =>
<div style={{height: '100%'}}>
  <CssBaseline/>
  <ThemeHelmet />
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
</div>

export default Persist;