import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Checkout from './components/Checkout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#84a98c',
    },
    secondary: {
      main: '#52796f',
    },
    background: {
      default: '#cad2c5',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Checkout />
    </ThemeProvider>
  );
};

export default App;