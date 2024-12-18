import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../utils/cards';

interface InfoButtonProps {
  currentCard?: Card | null;
  isGamePage?: boolean;
}

const InfoIcon = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: transform 0.3s ease;
  border-radius: 10px;
  filter: brightness(1.2);

  &:hover {
    transform: scale(1.1);
  }
`;

const RulesContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.95);
  padding: 20px;
  border-radius: 15px;
  border: 2px solid #ffd700;
  color: #ffd700;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  z-index: 1000;
  font-family: 'MedievalSharp', cursive;
`;

const RuleText = styled.div`
  text-align: left;
  white-space: pre-wrap;
  font-family: 'MedievalSharp', cursive;
  font-size: 1.1em;
  line-height: 1.8;
  margin: 0 auto;
  max-width: 800px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;

const InfoButton: React.FC<InfoButtonProps> = ({ currentCard, isGamePage = false }) => {
  const [showRules, setShowRules] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
      setShowRules(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleRules = () => {
    setShowRules(!showRules);
  };

  const getAllRules = () => {
    return `Règles du Roi des Barbus :

As ♥♦: Le joueur boit 1 gorgée
As ♠♣: Le joueur distribue 1 gorgée

2 ♥♦: Le joueur boit 2 gorgées
2 ♠♣: Le joueur distribue 2 gorgées

3 ♥♦: Le joueur boit 3 gorgées
3 ♠♣: Le joueur distribue 3 gorgées

4 ♥♦: Le joueur boit 4 gorgées
4 ♠♣: Le joueur distribue 4 gorgées

5 ♥♦: Le joueur boit 5 gorgées
5 ♠♣: Le joueur distribue 5 gorgées

6: Le joueur peut soit ajouter une nouvelle règle, soit supprimer une règle existante

7: Tous les joueurs lèvent la main. Le dernier à le faire boit.

8: Le joueur choisit quelqu'un qui devra boire à chaque fois qu'il boit, jusqu'à la prochaine carte 8.

9: Tous les joueurs doivent dire un mot qui rime. Le premier qui ne trouve pas boit.

10: Le joueur invente une nouvelle catégorie. Le premier qui ne trouve plus de mot boit.

Valet: Le joueur invente une nouvelle règle qui s'appliquera jusqu'à la fin de la partie.

Dame: Questions ! Le joueur pose une question à qui il veut, qui doit en poser une autre, etc. Le premier qui ne répond pas boit.

Roi: Tu deviens le Roi ! Tu peux mettre ton poing sous ton menton quand tu veux, le dernier à suivre boit.`;
  };

  const getCurrentCardRule = () => {
    if (!currentCard) {
      return "Tirez une carte pour voir la règle";
    }

    const rules: { [key: string]: string } = {
      'A': currentCard.suit === 'hearts' || currentCard.suit === 'diamonds' ?
        "Le joueur boit 1 gorgée." :
        "Le joueur distribue 1 gorgée à qui il veut.",
      '2': currentCard.suit === 'hearts' || currentCard.suit === 'diamonds' ?
        "Le joueur boit 2 gorgées." :
        "Le joueur distribue 2 gorgées à qui il veut.",
      '3': currentCard.suit === 'hearts' || currentCard.suit === 'diamonds' ?
        "Le joueur boit 3 gorgées." :
        "Le joueur distribue 3 gorgées à qui il veut.",
      '4': currentCard.suit === 'hearts' || currentCard.suit === 'diamonds' ?
        "Le joueur boit 4 gorgées." :
        "Le joueur distribue 4 gorgées à qui il veut.",
      '5': currentCard.suit === 'hearts' || currentCard.suit === 'diamonds' ?
        "Le joueur boit 5 gorgées." :
        "Le joueur distribue 5 gorgées à qui il veut.",
      '6': "Le joueur peut soit ajouter une nouvelle règle, soit supprimer une règle existante.",
      '7': "Tous les joueurs lèvent la main. Le dernier à le faire boit.",
      '8': "Le joueur choisit quelqu'un qui devra boire à chaque fois qu'il boit, jusqu'à la prochaine carte 8.",
      '9': "Tous les joueurs doivent dire un mot qui rime. Le premier qui ne trouve pas boit.",
      '10': "Le joueur invente une nouvelle catégorie. Le premier qui ne trouve plus de mot boit.",
      'J': "Le joueur invente une nouvelle règle qui s'appliquera jusqu'à la fin de la partie.",
      'Q': "Questions ! Le joueur pose une question à qui il veut, qui doit en poser une autre, etc. Le premier qui ne répond pas boit.",
      'K': "Tu deviens le Roi ! Tu peux mettre ton poing sous ton menton quand tu veux, le dernier à suivre boit."
    };

    return rules[currentCard.symbol] || "Règle non trouvée";
  };

  return (
    <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 100 }}>
      <InfoIcon
        src={process.env.PUBLIC_URL + '/images/info-button.jpg'}
        alt="Info"
        onClick={toggleRules}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      />
      
      {showTooltip && !showRules && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          color: '#ffd700',
          padding: '10px',
          borderRadius: '5px',
          whiteSpace: 'nowrap'
        }}>
          {isGamePage ? "Voir la règle de la carte" : "Voir toutes les règles"}
        </div>
      )}

      {showRules && (
        <>
          <Overlay onClick={() => setShowRules(false)} />
          <RulesContainer ref={tooltipRef}>
            <RuleText>
              {isGamePage ? getCurrentCardRule() : getAllRules()}
            </RuleText>
          </RulesContainer>
        </>
      )}
    </div>
  );
};

export default InfoButton;
