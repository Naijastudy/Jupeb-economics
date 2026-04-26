import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as ServiceWorkerRegistration from'./serviceworkerRegistration';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
ServiceWorkerRegistration.register();