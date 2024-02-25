import { useContext } from 'react';
import { BurgerMenuContext } from '../contexts/BurgerMenuContext';

export const useBurgerMenu = () => {
  const context = useContext(BurgerMenuContext);
  if (!context) {
    throw new Error('useBurgerMenu must be used within a BurgerMenuProvider');
  }
  return context;
};
