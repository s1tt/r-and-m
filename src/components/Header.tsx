import styled from 'styled-components';
import BurgerButton from './BurgerButton';

const Header = () => {
  return (
    <HeaderWrapper>
      <StyledHeaderContent>
        <div style={{ display: 'flex' }}>
          {/* <p>Some content</p>
          <p>Some content</p> */}
        </div>
        <StyledHeaderLogo
          src={'/icons8-rick-sanchez-400.png'}
          alt='rick-sanchez'
          height={'100%'}
        />
        <StyledRightMenu>
          {/* <p>Some content</p> */}
          <BurgerButton />
        </StyledRightMenu>
      </StyledHeaderContent>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  color: red;
  text-align: center;
  padding: 30px;
  position: fixed;
  top: 0;
  max-width: 1440px;
  width: 100%;
  height: 100px;
  background-color: #333;
  color: white;
  padding: 10px;

  background-color: #000000e6;
  box-shadow: #000 0 8px 15px;
  z-index: 1;
`;

const StyledHeaderContent = styled.div`
  height: 100%;
  padding: 10px 40px;
  display: flex;
  justify-content: space-around;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 70px);
  align-items: center;

  @media screen and (max-width: 600px) {
    padding: 10px 10px;
  }
`;

const StyledHeaderLogo = styled.img`
  height: 100%;
  margin: 0 auto;
`;

const StyledRightMenu = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
