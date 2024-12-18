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
    url('/images/background.jpg');
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

const GameContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
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
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  white-space: nowrap;
`;

const TableArea = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const CardsContainer = styled.div`
  position: relative;
  width: 220px;
  height: 320px;
  perspective: 1000px;
`;

const CardWrapper = styled(motion.div)<{ isRevealed: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  z-index: ${props => props.isRevealed ? 2 : 1};
`;

const CardBack = styled(motion.div)`
  position: absolute;
  width: 220px;
  height: 320px;
  backface-visibility: hidden;
  background: url(${process.env.PUBLIC_URL}/images/cardback.jpg) no-repeat center center;
  background-size: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border: 2px solid gold;
  cursor: pointer;
`;

const CardFront = styled(motion.div)`
  position: absolute;
  width: 220px;
  height: 320px;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border: 2px solid gold;
  cursor: pointer;
  z-index: 3;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const DeckPile = styled(motion.div)`
  display: none;
`;

const GameEndContainer = styled.div`
  text-align: center;
  margin-top: 20px;
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
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [isDrawing, setIsDrawing] = useState(true);
  const [gameEnded, setGameEnded] = useState(false);
  const [deck, setDeck] = useState<Card[]>(shuffleArray(generateDeck()));
  const [showConfetti, setShowConfetti] = useState(false);

  const nextPlayer = players[currentPlayerIndex];

  const handleCardClick = () => {
    if (isDrawing && deck.length > 0) {
      const newDeck = [...deck];
      const drawnCard = newDeck.pop();
      
      console.log("Carte tirée:", drawnCard?.symbol);
      
      if (drawnCard?.symbol === 'K') {
        console.log("Roi détecté !");
        setShowConfetti(true);
      } else {
        setShowConfetti(false);
      }
      
      setDeck(newDeck);
      setCurrentCard(drawnCard || null);
      setIsDrawing(false);
    }
  };

  const handleNextTurn = () => {
    if (!isDrawing) {
      if (deck.length === 0) {
        setGameEnded(true);
        return;
      }
      setIsDrawing(true);
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    }
  };

  const startNewGame = () => {
    const newDeck = shuffleArray(generateDeck());
    setDeck(newDeck);
    setCurrentCard(null);
    setIsDrawing(true);
    setCurrentPlayerIndex(0);
    setGameEnded(false);
  };

  useEffect(() => {
    console.log("État des confettis:", showConfetti);
  }, [showConfetti]);

  useEffect(() => {
    if (players.length < 2) {
      navigate('/');
      return;
    }
    startNewGame();
  }, [players, navigate]);

  return (
    <GameContainer>
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
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
          }
        `}
      </style>
      <BackButton
        onClick={() => navigate('/')}
      >
        ←
      </BackButton>

      <InfoButtonWrapper>
        <InfoButton currentCard={currentCard} isGamePage={true} />
      </InfoButtonWrapper>

      <GameTitle
        src={process.env.PUBLIC_URL + '/images/title.png'}
        alt="Le Roi des Barbus"
        onClick={() => navigate('/')}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      />

      <PlayerTurnText>
        {nextPlayer ? `À ${nextPlayer} de jouer !` : 'Commençons la partie !'}
      </PlayerTurnText>

      <TableArea>
        <CardsContainer>
          <CardWrapper
            isRevealed={!isDrawing}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isDrawing ? 0 : 180 }}
            transition={{ 
              duration: 0.6,
              ease: "easeInOut"
            }}
          >
            <CardBack onClick={handleCardClick} />
            {currentCard && (
              <CardFront onClick={handleNextTurn}>
                <CardImage 
                  src={currentCard.image} 
                  alt={`${currentCard.symbol} of ${currentCard.suit}`} 
                />
              </CardFront>
            )}
          </CardWrapper>
        </CardsContainer>
      </TableArea>

      {gameEnded && (
        <>
          <GameEndContainer>
            <h2>Partie terminée !</h2>
          </GameEndContainer>
          <ButtonContainer>
            <Button 
              onClick={startNewGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Rejouer
            </Button>
            <Button 
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Retour à l'accueil
            </Button>
          </ButtonContainer>
        </>
      )}
    </GameContainer>
  );
};

export default Game;
