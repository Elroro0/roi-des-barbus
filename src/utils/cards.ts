export interface Card {
  symbol: string;
  suit: string;
  rule: string;
  isRed: boolean;
  image: string;
}

const getRuleForCard = (symbol: string, suit: string): string => {
  const isRed = ['hearts', 'diamonds'].includes(suit);
  
  switch (symbol) {
    case 'K':
      return 'Tu deviens le Roi de la table ! Tu peux placer ton poing sous ton menton à tout moment. Tous les autres joueurs doivent suivre. Le dernier à le faire boit une gorgée.';
    case 'Q':
      return 'Toutes les femmes boivent une gorgée !';
    case 'J':
      return 'Tous les hommes boivent une gorgée !';
    case '10':
      return 'Choisis un thème (films, pays, couleurs, etc.). Chaque joueur doit nommer un élément du thème. Celui qui échoue boit une gorgée.';
    case '9':
      return 'Dis une chose que tu n\'as jamais faite. Ceux qui l\'ont faite boivent une gorgée.';
    case '8':
      return 'Dis une chose que tu as déjà faite. Ceux qui ne l\'ont jamais faite boivent une gorgée.';
    case '7':
      return 'Lance le jeu "Dans ma valise" ! Chaque joueur ajoute un élément, le perdant boit.';
    case '6':
      return 'Tu peux soit ajouter une nouvelle règle temporaire, soit supprimer une règle existante.';
    case '5':
    case '4':
    case '3':
    case '2':
    case '1':
      return isRed ? 
        `Bois ${symbol} gorgées !` :
        `Distribue ${symbol} gorgées à d'autres joueurs !`;
    case 'A':
      return 'Bois une gorgée !';
    default:
      return '';
  }
};

// Fonction de mélange améliorée utilisant l'algorithme de Fisher-Yates
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  
  // Premier mélange (Fisher-Yates)
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Deuxième mélange avec décalage
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * shuffled.length);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Troisième mélange avec inversion aléatoire
  if (Math.random() > 0.5) {
    shuffled.reverse();
  }
  
  return shuffled;
};

export const generateDeck = (): Card[] => {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const symbols = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  
  const deck: Card[] = [];
  
  for (const suit of suits) {
    for (const symbol of symbols) {
      deck.push({
        symbol,
        suit,
        rule: getRuleForCard(symbol, suit),
        isRed: suit === 'hearts' || suit === 'diamonds',
        image: `${process.env.PUBLIC_URL}/images/cards/${symbol}_${suit}.jpg`
      });
      
      // Log pour le débogage
      console.log(`Création carte: ${symbol} de ${suit}, règle: ${getRuleForCard(symbol, suit)}`);
    }
  }
  
  // Mélanger le deck une seule fois mais de manière plus approfondie
  return shuffleArray(deck);
};
