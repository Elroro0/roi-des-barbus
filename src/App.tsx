import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import Game from './components/Game/Game';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #1a1a1a;
    color: white;
    font-family: Arial, sans-serif;
  }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
