import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Character } from '../types/character';
import { getCharacterBgColor } from '../utils/getCharacterBgColor';
import { getCharacterColorByStatus } from '../utils/getCharacterColorByStatus';
import CharacterModal from './CharacterModal';
import StatusCircle from './StatusCircle';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  const [isCharacterModalOpened, setIsCharacterModalOpened] = useState(false);

  const onCloseModal = useCallback(() => {
    setIsCharacterModalOpened(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsCharacterModalOpened(true);
  }, []);

  return (
    <StyledCard $gender={character.gender} onClick={onShowModal}>
      <div style={{ position: 'absolute', right: '8px', top: '8px' }}>
        <StatusCircle status={character.status} />
      </div>
      <StyledImage
        src={character.image}
        alt={character.name}
        $status={character.status}
      />
      <StyledTitle $status={character.status}>{character.name}</StyledTitle>

      <p>Race: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <CharacterModal
        isOpen={isCharacterModalOpened}
        onClose={onCloseModal}
        character={character}
      />
    </StyledCard>
  );
};

export default CharacterCard;

const StyledCard = styled.article<{ $gender: Character['gender'] }>`
  width: 200px;
  height: 100%;
  border: solid 3px ${props => props.theme.colors.card.border};
  border-radius: ${props => props.theme.borderRadius};
  transition: all 0.3s ease;
  padding: 10px 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
  background-color: ${props => getCharacterBgColor(props.$gender)};
  &:hover,
  &:hover img {
    box-shadow: 0 0 20px 2px #9dc68e;
  }
`;

const StyledImage = styled.img<{ $status: Character['status'] }>`
  position: absolute;
  border: 2px solid ${props => getCharacterColorByStatus(props.$status)};
  width: 70%;
  transform: translateY(calc(-50% - 10px));
  border-radius: 50%;
  transition: all 0.3s ease;
`;

const StyledTitle = styled.h2<{ $status: Character['status'] }>`
  margin-top: 80px;
  margin-bottom: 30px;
  position: relative;
  font-size: 24px;
  line-height: 150%;
  font-weight: bold;
  text-align: center;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  color: ${props => props.theme.colors.textMain};
`;
