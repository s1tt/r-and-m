import { ReactNode, createContext, useState } from 'react';

interface BurgerMenuContextType {
  isBurgerMenuOpen: boolean;
  openBurgerMenu: () => void;
  closeBurgerMenu: () => void;
}

export const BurgerMenuContext = createContext<
  BurgerMenuContextType | undefined
>(undefined);

export const BurgerMenuProvider = ({ children }: { children: ReactNode }) => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const openBurgerMenu = () => setIsBurgerMenuOpen(true);
  const closeBurgerMenu = () => setIsBurgerMenuOpen(false);

  return (
    <BurgerMenuContext.Provider
      value={{ isBurgerMenuOpen, openBurgerMenu, closeBurgerMenu }}
    >
      {children}
    </BurgerMenuContext.Provider>
  );
};
