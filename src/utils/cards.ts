export interface Card {
  symbol: string;
  suit: string;
  rule: string;
  isRed: boolean;
  image: string;
}

const getRuleForCard = (symbol: string): string => {
  switch (symbol) {
    case 'K':
      return 'Tu deviens le Roi de la table ! Tu peux forcer les joueurs à poser leur poing sous le menton à tout moment.';
    case 'Q':
      return 'Toutes les femmes boivent une gorgée !';
    case 'J':
      return 'Tous les hommes boivent une gorgée !';
    case 'A':
      return 'Bois une gorgée !';
    case '2':
    case '3':
    case '4':
    case '5':
      return `Bois ${symbol} gorgées !`;
    case '6':
      return 'Tu peux soit ajouter une nouvelle règle temporaire, soit supprimer une règle existante.';
    case '7':
      return 'Lance le jeu "Dans ma valise" ! Chaque joueur ajoute un élément, le perdant boit.';
    case '8':
      return 'Dis une chose que tu as déjà faite mais que les autres non, ou bois autant de gorgées que le nombre de joueurs si tout le monde l\'a déjà fait.';
    case '9':
      return 'Dis une chose que tu n\'as jamais faite, les autres boivent s\'ils l\'ont fait.';
    case '10':
      return 'Choisis un thème, et tous les joueurs nomment un élément du thème (le perdant boit).';
    default:
      return '';
  }
};

// Fonction de mélange améliorée utilisant l'algorithme de Fisher-Yates
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  
  // Premier mélange
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Deuxième mélange
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Troisième mélange
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
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
        rule: getRuleForCard(symbol),
        isRed: suit === 'hearts' || suit === 'diamonds',
        image: `${process.env.PUBLIC_URL}/images/cards/${symbol}_${suit}.jpg`
      });
    }
  }
  
  // Mélanger plusieurs fois le deck pour plus de randomisation
  let shuffledDeck = shuffleArray(deck);
  shuffledDeck = shuffleArray(shuffledDeck);
  shuffledDeck = shuffleArray(shuffledDeck);
  
  return shuffledDeck;
};
