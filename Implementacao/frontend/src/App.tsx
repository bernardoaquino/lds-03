import React from 'react';
import { 
  RouterProvider
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';

/** Routes */
import routes from './routes';

/** Theme */
import { themeConfig } from './utils/theme';

/** Provider */
import { AuthProvider } from './providers/Auth';

/** Style */
import GlobalStyle from './utils/getGlobalStyle';

function App() {
  return (
    <ThemeProvider theme={themeConfig}>
      <AuthProvider>
        <ToastContainer />
        <GlobalStyle />
        <RouterProvider router={routes} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
