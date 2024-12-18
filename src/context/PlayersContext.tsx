import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PlayersContextType {
  players: string[];
  setPlayers: (players: string[]) => void;
  currentPlayerOrder: string[];
  setCurrentPlayerOrder: (order: string[]) => void;
}

const PlayersContext = createContext<PlayersContextType | undefined>(undefined);

export const PlayersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [players, setPlayers] = useState<string[]>([]);
  const [currentPlayerOrder, setCurrentPlayerOrder] = useState<string[]>([]);

  return (
    <PlayersContext.Provider value={{ players, setPlayers, currentPlayerOrder, setCurrentPlayerOrder }}>
      {children}
    </PlayersContext.Provider>
  );
};

export const usePlayers = () => {
  const context = useContext(PlayersContext);
  if (context === undefined) {
    throw new Error('usePlayers must be used within a PlayersProvider');
  }
  return context;
};
