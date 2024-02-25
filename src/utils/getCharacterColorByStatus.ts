import { theme } from '../main';
import { Character } from '../types/character';

export const getCharacterColorByStatus = (status: Character['status']) => {
  switch (status) {
    case 'Alive':
      return theme.colors.card.charactersStatus.alive;
    case 'Dead':
      return theme.colors.card.charactersStatus.dead;
    default:
      return theme.colors.card.charactersStatus.unknown;
  }
};
