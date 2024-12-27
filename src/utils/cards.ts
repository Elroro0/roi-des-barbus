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
      return 'Le joueur devient le Roi de la table. Il peut placer son poing sous son menton à tout moment. Les autres doivent suivre. Le dernier à le faire boit une gorgée.';
    case 'Q':
      return 'Toutes les femmes boivent une gorgée.';
    case 'J':
      return 'Tous les hommes boivent une gorgée.';
    case '10':
      return 'Le joueur choisit un thème (films, couleurs, pays, etc.). Chaque joueur doit nommer un élément du thème. Celui qui échoue boit une gorgée.';
    case '9':
      return 'Le joueur dit une chose qu\'il n\'a jamais faite, mais que les autres ont peut-être déjà faite. Ceux qui l\'ont déjà faite boivent une gorgée. Si personne ne l\'a faite, le joueur boit autant de gorgées que le nombre de joueurs.';
    case '8':
      return 'Le joueur doit dire une chose qu\'il a déjà faite mais que les autres n\'ont jamais faite. Ceux qui n\'ont jamais fait cette chose boivent une gorgée. Si tout le monde l\'a déjà fait, le joueur boit autant de gorgées que le nombre de joueurs.';
    case '7':
      return 'Le joueur lance le jeu "Dans ma valise". À tour de rôle, chaque joueur ajoute un élément à la valise. Option spéciale : Le joueur peut dire "Répète" pour défier le dernier joueur. Si le dernier joueur réussit, celui qui a dit "Répète" boit le double. Si le dernier joueur échoue, il boit une gorgée.';
    case '6':
      return 'Le joueur peut ajouter une nouvelle règle temporaire (valable jusqu\'à ce qu\'un autre joueur tire un 6), ou il peut supprimer une règle existante.';
    case '5':
    case '4':
    case '3':
    case '2':
    case '1':
      return isRed ? 
        `Le joueur boit ${symbol} gorgées.` :
        `Le joueur distribue ${symbol} gorgées à d'autres joueurs (il ne boit pas lui-même).`;
    case 'A':
      return isRed ? 
        'Le joueur boit 1 gorgée.' :
        'Le joueur distribue 1 gorgée à un autre joueur.';
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
      const rule = getRuleForCard(symbol, suit);
      deck.push({
        symbol,
        suit,
        rule,
        isRed: suit === 'hearts' || suit === 'diamonds',
        image: `${process.env.PUBLIC_URL}/images/cards/${symbol.toLowerCase()}_${suit}.jpg`
      });
    }
  }
  
  return shuffleArray(deck);
};
