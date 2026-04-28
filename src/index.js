import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkeregistration from './serviceWorkeregistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

serviceWorkerRegistration.unregister();
