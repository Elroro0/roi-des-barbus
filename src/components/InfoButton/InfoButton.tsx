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
    return `Règles des cartes :
Cartes Cœur et Carreau (Rouges)
Cartes numérotées de 1 à 5 : Le joueur boit le nombre de gorgées indiqué.
Carte 6 :
Le joueur peut ajouter une nouvelle règle temporaire (valable jusqu'à ce qu'un autre joueur tire un 6).
Ou, il peut supprimer une règle existante.
Carte 7 : Le joueur lance le jeu "Dans ma valise".
À tour de rôle, chaque joueur ajoute un élément à la valise.
Option spéciale : Le joueur peut dire "Répète" pour défier le dernier joueur.
Si le dernier joueur réussit, celui qui a dit "Répète" boit le double.
Si le dernier joueur échoue, il boit une gorgée.
Carte 8 : Le joueur doit dire une chose qu'il a déjà faite mais que les autres n'ont jamais faite.
Ceux qui n'ont jamais fait cette chose boivent une gorgée.
Si tout le monde l'a déjà fait, le joueur boit autant de gorgées que le nombre de joueurs.
Carte 9 : Le joueur dit une chose qu'il n'a jamais faite, mais que les autres ont peut-être déjà faite.
Ceux qui l'ont déjà faite boivent une gorgée.
Si personne ne l'a faite, le joueur boit autant de gorgées que le nombre de joueurs.
Carte 10 : Le joueur choisit un thème (films, couleurs, pays, etc.).
Chaque joueur doit nommer un élément du thème. Celui qui échoue boit une gorgée.

Cartes Trèfle et Pique (Noires)
Cartes numérotées de 1 à 5 : Le joueur distribue le nombre de gorgées indiqué à d'autres joueurs (il ne boit pas lui-même).
Les cartes de 6 à 10 suivent les mêmes règles que les cartes rouges.

Cartes Figures (Valet, Dame, Roi)
Valet (toutes couleurs) : Tous les hommes boivent une gorgée.
Dame (toutes couleurs) : Toutes les femmes boivent une gorgée.
Roi (toutes couleurs) : Le joueur devient le Roi de la table.
Il peut placer son poing sous son menton à tout moment.
Les autres doivent suivre. Le dernier à le faire boit une gorgée.`;
  };

  const getCurrentCardRule = () => {
    if (!currentCard) {
      return "Tirez une carte pour voir la règle";
    }

    const rules: { [key: string]: string } = {
      'A': currentCard.suit === 'hearts' || currentCard.suit === 'diamonds' ?
        "Le joueur boit 1 gorgée." :
        "Le joueur distribue 1 gorgée à un autre joueur.",
      '2': currentCard.suit === 'hearts' || currentCard.suit === 'diamonds' ?
        "Le joueur boit 2 gorgées." :
        "Le joueur distribue 2 gorgées à d'autres joueurs (il ne boit pas lui-même).",
      '3': currentCard.suit === 'hearts' || currentCard.suit === 'diamonds' ?
        "Le joueur boit 3 gorgées." :
        "Le joueur distribue 3 gorgées à d'autres joueurs (il ne boit pas lui-même).",
      '4': currentCard.suit === 'hearts' || currentCard.suit === 'diamonds' ?
        "Le joueur boit 4 gorgées." :
        "Le joueur distribue 4 gorgées à d'autres joueurs (il ne boit pas lui-même).",
      '5': currentCard.suit === 'hearts' || currentCard.suit === 'diamonds' ?
        "Le joueur boit 5 gorgées." :
        "Le joueur distribue 5 gorgées à d'autres joueurs (il ne boit pas lui-même).",
      '6': "Le joueur peut ajouter une nouvelle règle temporaire (valable jusqu'à ce qu'un autre joueur tire un 6), ou il peut supprimer une règle existante.",
      '7': "Le joueur lance le jeu \"Dans ma valise\". À tour de rôle, chaque joueur ajoute un élément à la valise. Option spéciale : Le joueur peut dire \"Répète\" pour défier le dernier joueur. Si le dernier joueur réussit, celui qui a dit \"Répète\" boit le double. Si le dernier joueur échoue, il boit une gorgée.",
      '8': "Le joueur doit dire une chose qu'il a déjà faite mais que les autres n'ont jamais faite. Ceux qui n'ont jamais fait cette chose boivent une gorgée. Si tout le monde l'a déjà fait, le joueur boit autant de gorgées que le nombre de joueurs.",
      '9': "Le joueur dit une chose qu'il n'a jamais faite, mais que les autres ont peut-être déjà faite. Ceux qui l'ont déjà faite boivent une gorgée. Si personne ne l'a faite, le joueur boit autant de gorgées que le nombre de joueurs.",
      '10': "Le joueur choisit un thème (films, couleurs, pays, etc.). Chaque joueur doit nommer un élément du thème. Celui qui échoue boit une gorgée.",
      'J': "Tous les hommes boivent une gorgée.",
      'Q': "Toutes les femmes boivent une gorgée.",
      'K': "Le joueur devient le Roi de la table. Il peut placer son poing sous son menton à tout moment. Les autres doivent suivre. Le dernier à le faire boit une gorgée."
    };

    return rules[currentCard.symbol] || "Règle inconnue";
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
