import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import { PlayersProvider } from './context/PlayersContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <PlayersProvider>
        <App />
      </PlayersProvider>
    </HashRouter>
  </React.StrictMode>
);

// Si vous voulez que votre application fonctionne hors ligne et se charge plus rapidement, vous pouvez changer
// unregister() pour register() ci-dessous. Notez que cela comporte quelques pièges.
// En savoir plus sur les service workers : https://cra.link/PWA
serviceWorkerRegistration.register();

reportWebVitals();
