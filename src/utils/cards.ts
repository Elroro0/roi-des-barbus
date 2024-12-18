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
      return 'Tu es le Roi des Barbus ! Tous les joueurs doivent mettre leur poing sous leur menton quand tu le demandes. Le dernier à le faire boit une gorgée.';
    case 'Q':
      return 'Tu es la Reine ! Distribue 2 gorgées à qui tu veux.';
    case 'J':
      return 'Tu es le Valet ! Bois une gorgée avec la personne de ton choix.';
    case '10':
      return 'Choisis un thème. Chaque joueur doit dire un mot lié à ce thème. Le premier qui hésite ou se répète boit 2 gorgées.';
    case '9':
      return 'Fais une action. Tous ceux qui ne peuvent pas ou ne veulent pas la refaire boivent une gorgée.';
    case '8':
      return 'La cascade ! Commence à boire, le joueur suivant peut commencer quand tu t\'arrêtes, etc.';
    case '7':
      return 'Lève ton verre et dis "À la santé de...". Le dernier à trinquer boit 2 gorgées.';
    case '6':
      return 'Tous les joueurs qui ont une barbe boivent une gorgée !';
    case '5':
      return 'Invente une règle qui restera valable jusqu\'à la fin de la partie.';
    case '4':
      return 'Tous ceux qui ont bu depuis le début de la partie boivent encore une gorgée.';
    case '3':
      return 'Distribue 3 gorgées comme tu veux.';
    case '2':
      return 'Choisis quelqu\'un qui devra boire 2 gorgées.';
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
      const card: Card = {
        symbol,
        suit,
        rule: getRuleForCard(symbol),
        isRed: suit === 'hearts' || suit === 'diamonds',
        image: `${process.env.PUBLIC_URL}/images/cards/${symbol.toLowerCase()}_of_${suit}.png`
      };
      
      // Log pour le débogage
      console.log(`Création carte: ${symbol} de ${suit}, règle: ${card.rule}`);
      
      deck.push(card);
    }
  }
  
  // Mélanger le deck une seule fois mais de manière plus approfondie
  return shuffleArray(deck);
};
