import styled, { keyframes } from 'styled-components';

const SkeletonCharacterCard = () => {
  return (
    <StyledCard>
      <StyledImage></StyledImage>
      <StyledTitle></StyledTitle>
      <StyledParagraph />
      <StyledParagraph />
    </StyledCard>
  );
};

const shine = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

const StyledCard = styled.article`
  background-color: #585858;
  width: 200px;
  height: 230px;
  border-radius: ${props => props.theme.borderRadius};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &:after {
    content: '';
    display: block;
    position: absolute;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, transparent, #2a2a2a, transparent);
    animation: ${shine} 1.5s infinite;
  }
`;

const StyledImage = styled.div`
  background-color: #666;
  position: absolute;
  width: 136px;
  height: 136px;
  transform: translateY(calc(-50% - 10px));
  border-radius: 50%;
  z-index: 1;

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    border-radius: 50%;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, transparent, #2a2a2a, transparent);
    animation: ${shine} 1.5s infinite;
  }
`;

const StyledTitle = styled.div`
  width: 80%;
  height: 36px;
  margin-top: 80px;
  margin-bottom: 30px;
  position: relative;
  background-color: #666;
  border-radius: 10px;
  z-index: 1;

  &::after {
    content: '';
    display: block;
    position: absolute;
    border-radius: 10px;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, transparent, #2a2a2a, transparent);
    animation: ${shine} 1.5s infinite;
  }
`;

const StyledParagraph = styled.p`
  width: 80%;
  height: 24px;
  margin-bottom: 5px;
  position: relative;
  background-color: #666;
  border-radius: 10px;
  z-index: 1;
  &::after {
    content: '';
    display: block;
    position: absolute;
    border-radius: 10px;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, transparent, #2a2a2a, transparent);
    animation: ${shine} 1.5s infinite;
  }
`;

export default SkeletonCharacterCard;
