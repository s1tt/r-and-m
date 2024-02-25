import styled from 'styled-components';
import { useBurgerMenu } from '../hooks/useBurgerMenu';

interface MobileMenuProps {
  children: React.ReactNode;
}

const MobileMenu = ({ children }: MobileMenuProps) => {
  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const { isBurgerMenuOpen, closeBurgerMenu } = useBurgerMenu();
  return (
    <StyledMobileMenuWrapper
      $isBurgerMenuOpen={isBurgerMenuOpen}
      onClick={closeBurgerMenu}
    >
      <StyledMobileMenu
        $isBurgerMenuOpen={isBurgerMenuOpen}
        onClick={onContentClick}
      >
        <StyledMobileMenuContent>
          {children}
          <StyledCloseButton onClick={closeBurgerMenu}>
            <StyledCloseIcon src='/close.svg' alt='closeBurger' />
          </StyledCloseButton>
        </StyledMobileMenuContent>
      </StyledMobileMenu>
    </StyledMobileMenuWrapper>
  );
};

export default MobileMenu;

const StyledMobileMenuWrapper = styled.div<{ $isBurgerMenuOpen: boolean }>`
  position: relative;
  opacity: ${({ $isBurgerMenuOpen }) => ($isBurgerMenuOpen ? 1 : 0)};
  pointer-events: painted;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(3px);
  z-index: ${({ $isBurgerMenuOpen }) => ($isBurgerMenuOpen ? 10 : -10)};
  transition: all 0.3s ease-in-out;

  @media screen and (min-width: 901px) {
    display: none;
  }
`;

const StyledMobileMenu = styled.div<{ $isBurgerMenuOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 70vw;
  min-width: 340px;
  height: 100vh;
  z-index: 10;
  background: linear-gradient(to right, rgb(10, 38, 41) 98%, transparent);
  transform: ${({ $isBurgerMenuOpen }) =>
    $isBurgerMenuOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: all 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  overflow: hidden;
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: inherit;
  border: none;
  cursor: pointer;

  transition: all 0.3s;

  &:hover {
    scale: 1.1;
  }
`;

const StyledCloseIcon = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledMobileMenuContent = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
