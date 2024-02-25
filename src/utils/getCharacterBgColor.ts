import { theme } from '../main';
import { Character } from '../types/character';

export const getCharacterBgColor = (gender: Character['gender']) => {
  switch (gender) {
    case 'Female':
      return theme.colors.card.charactersBackground.female;
    case 'Male':
      return theme.colors.card.charactersBackground.male;
    case 'Genderless':
      return theme.colors.card.charactersBackground.genderless;
    default:
      return theme.colors.card.charactersBackground.unknown;
  }
};
