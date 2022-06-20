import React from 'react';
import { CssBaseline, Typography, ThemeProvider } from '@mui/material';
import { ApolloProvider } from '@apollo/client';
import PrivateRoute from './routes/PrivateRoute';
import ErrorBoundry from './Components/ErrorBoundries/ErrorBoundries';
import theme from './theme';
import SnackBarProvider from './contexts/SnackBarProvider/SnackBarProvider';
import client from './ApolloClient/Apolloclient';

const App = () => (
  <ErrorBoundry>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <SnackBarProvider>
          <Typography>
            <CssBaseline />
            <PrivateRoute />
          </Typography>
        </SnackBarProvider>
      </ThemeProvider>
    </ApolloProvider>
  </ErrorBoundry>
);

export default App;
