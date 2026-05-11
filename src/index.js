import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import { AppProvider } from './context/AppContext';
import GlobalStyles from './components/GlobalStyles';
import * as serviceWorkerRegistration
  from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <ErrorBoundary>
    <AppProvider>
      <GlobalStyles />
      <App />
    </AppProvider>
  </ErrorBoundary>
);

serviceWorkerRegistration.register();
