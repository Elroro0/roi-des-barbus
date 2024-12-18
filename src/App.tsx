import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Home from './components/Home/Home';
import Game from './components/Game/Game';
import { PlayersProvider } from './context/PlayersContext';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
  }

  body {
    background: #1a1a1a;
    color: #fff;
    min-height: 100vh;
    width: 100%;
  }
`;

const App: React.FC = () => {
  return (
    <PlayersProvider>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
    </PlayersProvider>
  );
};

export default App;
