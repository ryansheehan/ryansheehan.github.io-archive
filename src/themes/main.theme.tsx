import React from 'react';
import { createMuiTheme } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import {Helmet} from 'react-helmet-async';

export const theme = createMuiTheme({
  overrides: {
    MuiLink: {
      root: {
        backgroundImage: 'none',
        textShadow: 'none',
      }
    },
    MuiButtonBase: {
      root: {
        backgroundImage: 'none'
      }
    }
  },
  typography: {
    fontSize: 12,
    h1: {
      fontFamily: 'Roboto Slab'
    },
    h2: {
      fontFamily: 'Roboto Slab'
    },
    h3: {
      fontFamily: 'Roboto Slab'
    },
    h4: {
      fontFamily: 'Roboto Slab'
    },
    h5: {
      fontFamily: 'Roboto Slab'
    },
    h6: {
      fontFamily: 'Roboto Slab'
    },

  },
  palette: {
    primary: {
      ...blueGrey,
      light: blueGrey[100],
      dark: blueGrey[800]
    },
    background: {
      default: blueGrey[100],
      paper: blueGrey[50]
    },
    text: {
      primary: blueGrey[900],
      secondary: blueGrey[50]
    },
    type: 'light'
  }
});

export const ThemeHelmet: React.FC = ({children}) =>
<>
<Helmet>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500|Roboto+Slab:400" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  <style type="text/css">{`
    html, body {
      height: 100vh;
    }

    body {
      display: flex;
    }

    #___gatsby, #gatsby-focus-wrapper {
      display: flex;
      flex: 1 1 auto;
    }
  `}</style>
  {children}
</Helmet>
</>;
