import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import { PlayersProvider } from './context/PlayersContext';

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

reportWebVitals();
