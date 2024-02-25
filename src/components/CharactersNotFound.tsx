import styled from 'styled-components';

const CharactersNotFound = () => {
  return (
    <StyledCharactersNotFound>
      <StyledImage src='/not-found-img.png' alt='not-found-img' />
      <StyledImage src='/not-found-text.png' alt='not-found' />
      <StyledText>
        It seems that this character does not exist in this universe.
      </StyledText>
    </StyledCharactersNotFound>
  );
};

export default CharactersNotFound;

const StyledImage = styled.img`
  /* display: flex; */
  width: 100%;
  /* max-width: 100%; */
  /* max-height: 100%; */
`;

const StyledText = styled.p`
  max-width: 50vw;
  text-align: center;
`;

const StyledCharactersNotFound = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 350px;
  /* max-height: 500px; */
`;
