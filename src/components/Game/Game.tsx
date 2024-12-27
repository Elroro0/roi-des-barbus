import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Card, generateDeck, shuffleArray } from '../../utils/cards';
import InfoButton from '../InfoButton/InfoButton';
import { usePlayers } from '../../context/PlayersContext';

const GameContainer = styled.div`
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
  position: relative;
`;

const InfoButtonWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
`;

const BackButton = styled(motion.button)`
  position: fixed;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  color: #ffd700;
  font-size: 2em;
  cursor: pointer;
  z-index: 100;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }
`;

const GameTitle = styled(motion.img)`
  width: 800px;
  max-width: 90%;
  margin-top: 2rem;
  margin-bottom: 4rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const TableArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60vh;
  position: relative;
  cursor: pointer;
`;

const CardArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  max-width: 1200px;
  height: 100%;
  position: relative;
`;

const DeckPile = styled.div`
  position: absolute;
  right: 20%;
  transform: translateX(50%);
  cursor: pointer;
`;

const PlayedPile = styled.div`
  position: absolute;
  left: 20%;
  transform: translateX(-50%);
`;

const CardImage = styled(motion.img)`
  width: 300px;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const CardBack = styled(motion.div)`
  width: 300px;
  height: 420px;
  background-image: url('${process.env.PUBLIC_URL}/images/card-back.png');
  background-size: cover;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

const PlayerTurnText = styled.h2`
  color: #ffd700;
  font-family: 'MedievalSharp', cursive;
  text-align: center;
  font-size: 2em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 30px;
  border-radius: 15px;
  border: 2px solid #ffd700;
  margin-bottom: 2rem;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  position: absolute;
  bottom: 100px;
  left: 0;
  right: 0;
`;

const Button = styled(motion.button)`
  font-family: 'MedievalSharp', cursive;
  font-size: 1.5em;
  padding: 15px 30px;
  background: rgba(139, 69, 19, 0.6);
  color: #ffd700;
  border: 2px solid #ffd700;
  border-radius: 8px;
  cursor: pointer;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }
`;

const Game: React.FC = () => {
  const navigate = useNavigate();
  const { players } = usePlayers();
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(-1);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [deck, setDeck] = useState<Card[]>(shuffleArray(generateDeck()));
  const [playedCards, setPlayedCards] = useState<Card[]>([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const nextPlayer = currentPlayerIndex >= 0 ? players[currentPlayerIndex] : null;

  const handleCardClick = () => {
    if (deck.length > 0 && !isFlipping) {
      setIsFlipping(true);
      const newDeck = [...deck];
      const drawnCard = newDeck.pop();
      
      if (drawnCard) {
        if (drawnCard.symbol === 'K') {
          setShowConfetti(true);
        } else {
          setShowConfetti(false);
        }
        
        setTimeout(() => {
          setDeck(newDeck);
          setCurrentCard(drawnCard);
          setPlayedCards(prev => [...prev, drawnCard]);
          setCurrentPlayerIndex(prev => 
            prev === -1 ? 0 : (prev + 1) % players.length
          );
          setIsFlipping(false);
        }, 300);

        if (newDeck.length === 0) {
          setGameEnded(true);
        }
      }
    }
  };

  const startNewGame = () => {
    const newDeck = shuffleArray(generateDeck());
    setDeck(newDeck);
    setCurrentCard(null);
    setCurrentPlayerIndex(-1);
    setPlayedCards([]);
    setGameEnded(false);
  };

  useEffect(() => {
    if (players.length < 2) {
      navigate('/');
      return;
    }
    startNewGame();
  }, [players, navigate]);

  return (
    <GameContainer>
      <BackButton onClick={() => navigate('/')}>←</BackButton>
      <InfoButtonWrapper>
        <InfoButton currentCard={currentCard} isGamePage={true} />
      </InfoButtonWrapper>

      <GameTitle 
        src={`${process.env.PUBLIC_URL}/images/title.png`}
        alt="Le Roi des Barbus"
      />

      <PlayerTurnText visible={currentPlayerIndex >= 0}>
        À {nextPlayer || ''} de jouer !
      </PlayerTurnText>

      <TableArea onClick={!gameEnded ? handleCardClick : undefined}>
        <CardArea>
          <PlayedPile>
            {playedCards.length > 0 && (
              <CardImage
                src={playedCards[playedCards.length - 1].image}
                alt="Played card"
                initial={{ rotateY: 180, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </PlayedPile>

          <DeckPile>
            {deck.length > 0 && (
              <CardBack
                initial={{ rotateY: 0 }}
                animate={{ rotateY: isFlipping ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </DeckPile>
        </CardArea>
      </TableArea>

      {gameEnded && (
        <ButtonContainer>
          <Button onClick={startNewGame}>Rejouer</Button>
          <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
        </ButtonContainer>
      )}

      {showConfetti && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 1000, 
          pointerEvents: 'none',
          animation: showConfetti ? 'fadeIn 0.3s' : 'fadeOut 0.8s',
          opacity: showConfetti ? 1 : 0
        }}>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={400}
            gravity={0.15}
            recycle={true}
            run={showConfetti}
            colors={['#ffd700', '#ff0000', '#00ff00', '#0000ff', '#ff00ff']}
            opacity={showConfetti ? 1 : 0}
            tweenDuration={800}
            initialVelocityY={1}
            initialVelocityX={0}
            confettiSource={{x: -50, y: -20, w: window.innerWidth + 100, h: 0}}
            friction={0.99}
          />
        </div>
      )}
    </GameContainer>
  );
};

export default Game;
