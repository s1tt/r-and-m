import styled from 'styled-components';
import { useBurgerMenu } from '../hooks/useBurgerMenu';

const BurgerButton = () => {
  const { openBurgerMenu, isBurgerMenuOpen, closeBurgerMenu } = useBurgerMenu();

  const toggleBurger = () => {
    isBurgerMenuOpen ? closeBurgerMenu() : openBurgerMenu();
  };
  return (
    <StyledButton onClick={toggleBurger}>
      <StyledPortalImg src='portal.png' alt='portal' />
      <StyledCruiserImg src='space-cruiser.png' alt='space-cruiser' />
      <StyledButtonText>menu</StyledButtonText>
    </StyledButton>
  );
};

export default BurgerButton;

const StyledButton = styled.button`
  border: none;
  width: 70px;
  height: 70px;
  background-color: inherit;
  position: relative;
  display: flex;
  justify-content: center;
  cursor: pointer;
  border: none;

  @media screen and (min-width: 901px) {
    display: none;
  }
`;

const StyledPortalImg = styled.img`
  position: absolute;
  height: 100%;
  top: 0;
`;
const StyledCruiserImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(50%);
  width: 80%;
`;

const StyledButtonText = styled.span`
  text-transform: uppercase;
  font-weight: 600;
  align-self: flex-end;
  z-index: 1;
`;
