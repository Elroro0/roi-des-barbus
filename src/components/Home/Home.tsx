import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import InfoButton from '../InfoButton/InfoButton';
import { usePlayers } from '../../context/PlayersContext';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)),
    url('${process.env.PUBLIC_URL}/background.jpg');
  background-size: cover;
  background-position: center;
  color: #fff;
`;

const TitleImage = styled.img`
  width: 600px;
  max-width: 90%;
  margin: 2rem auto;
  display: block;
  position: relative;
  top: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Title = styled.h1`
  display: block;
  font-size: 4rem;
  margin-bottom: 2rem;
`;

const PlayersList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
`;

const PlayerInput = styled.input`
  padding: 12px 20px;
  margin: 5px;
  border: 2px solid gold;
  border-radius: 8px;
  background: rgba(139, 69, 19, 0.3);
  color: #ffd700;
  font-size: 1.3em;
  font-family: 'MedievalSharp', cursive;
  width: 100%;
  text-align: center;

  &::placeholder {
    color: rgba(255, 215, 0, 0.5);
    text-align: center;
  }
`;

const AddPlayerButton = styled(motion.button)`
  font-size: 1.5em;
  padding: 5px 15px;
  margin: 10px;
  background: #ffd700;
  color: #1a1a1a;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
`;

const PlayerItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  padding: 10px 20px;
  margin: 5px 0;
  background: rgba(139, 69, 19, 0.3);
  border: 2px solid gold;
  border-radius: 8px;
  color: #ffd700;
  font-family: 'MedievalSharp', cursive;
  font-size: 1.2em;
`;

const RemovePlayerButton = styled.button`
  background: none;
  border: none;
  color: red;
  font-size: 1.2em;
  cursor: pointer;
  margin-left: 10px;
  padding: 5px;

  &:hover {
    transform: scale(1.1);
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  margin: 10px;
  font-size: 1.1em;
`;

const Button = styled(motion.button)`
  padding: 12px 24px;
  background: #ffd700;
  color: #1a1a1a;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { players, setPlayers } = usePlayers();
  const [newPlayer, setNewPlayer] = useState('');
  const [error, setError] = useState('');
  const [showConfetti] = useState(false);

  const addPlayer = () => {
    if (!newPlayer.trim()) {
      setError('Le nom du joueur ne peut pas être vide');
      return;
    }
    if (players.includes(newPlayer.trim())) {
      setError('Ce joueur existe déjà');
      return;
    }
    setPlayers([...players, newPlayer.trim()]);
    setNewPlayer('');
    setError('');
  };

  const removePlayer = (playerToRemove: string) => {
    setPlayers(players.filter(player => player !== playerToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addPlayer();
    }
  };

  const startGame = () => {
    if (players.length < 2) {
      setError('Il faut au moins 2 joueurs pour commencer');
      return;
    }
    navigate('/game');
  };

  return (
    <HomeContainer>
      <InfoButton isGamePage={false} />
      {showConfetti && <Confetti numberOfPieces={50} recycle={true} />}
      <TitleImage src={`${process.env.PUBLIC_URL}/images/title.png`} alt="Roi des Barbus" />
      
      <PlayersList>
        <InputContainer>
          <PlayerInput
            type="text"
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nom du joueur"
            maxLength={20}
          />
          <AddPlayerButton 
            onClick={addPlayer}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            +
          </AddPlayerButton>
        </InputContainer>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {players.map((player, index) => (
          <PlayerItem key={index}>
            <span style={{ color: 'white', fontSize: '1.2em' }}>{player}</span>
            <RemovePlayerButton onClick={() => removePlayer(player)}>×</RemovePlayerButton>
          </PlayerItem>
        ))}
      </PlayersList>

      <Button onClick={startGame} disabled={players.length < 2}>
        Commencer
      </Button>
    </HomeContainer>
  );
};

export default Home;
