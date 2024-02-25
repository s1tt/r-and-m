import { ReactNode } from 'react';
import styled from 'styled-components';

const DesktopMenu = ({ children }: { children: ReactNode }) => {
  return <StyledDesktopMenu>{children}</StyledDesktopMenu>;
};

export default DesktopMenu;

const StyledDesktopMenu = styled.div`
  position: fixed;
  top: 150px;
  max-width: 300px;
  height: calc(100vh - 200px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media screen and (max-width: 901px) {
    display: none;
  }
`;
