import styled, { keyframes } from 'styled-components';
import { Character } from '../types/character';
import { getCharacterBgColor } from '../utils/getCharacterBgColor';
import Modal from './Modal';
import StatusCircle from './StatusCircle';

interface CharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
}
const CharacterModal = ({
  isOpen,
  onClose,
  character
}: CharacterModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      lazy
      bgColor={getCharacterBgColor(character.gender)}
    >
      <StyledCharacterModal>
        <StyledImage src={character.image} alt={character.name} />
        <StyledInfoWrapper $gender={character.gender}>
          <StyledInfo>
            <StyledModalTitle>{character.name}</StyledModalTitle>
            <StyledModalParagraph>
              <StyledModalStatus>
                <span>
                  <b>Status:</b> {character.status}
                </span>

                <StatusCircle status={character.status} />
              </StyledModalStatus>
            </StyledModalParagraph>
            <StyledModalParagraph>
              <b>Species:</b> {character.species}
            </StyledModalParagraph>
            <StyledModalParagraph>
              <b>Origin:</b> {character.origin.name}
            </StyledModalParagraph>
            <StyledModalParagraph>
              <b>Creation date:</b>{' '}
              {new Date(character.created).toLocaleDateString() ?? 'unknown'}
            </StyledModalParagraph>
            <StyledModalParagraph>
              <b>Last seen on:</b> {character.location.name}
            </StyledModalParagraph>
            <StyledModalParagraph>
              <b>Gender:</b> {character.gender}
            </StyledModalParagraph>
            <StyledModalParagraph>
              <b>Type:</b> {character.name}
            </StyledModalParagraph>
          </StyledInfo>
        </StyledInfoWrapper>
      </StyledCharacterModal>
    </Modal>
  );
};

export default CharacterModal;

const StyledCharacterModal = styled.div`
  display: flex;
  position: relative;
  border-radius: ${props => props.theme.borderRadius};

  @media screen and (max-width: 901px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
`;

const imageAnimation = keyframes`
  from {
    width: 100%;

  }
  to {
    width: 100%;
  }
`;

const StyledImage = styled.img`
  z-index: 1;
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  border: solid 8px ${props => props.theme.colors.card.border};
  box-shadow: 0 0 200px 2px ${props => props.theme.colors.card.border};

  @media screen and (max-width: 901px) {
    animation: ${imageAnimation} 0.3s ease 0.5s;
    animation-fill-mode: forwards;
    border-radius: 10%;
    position: static;
    transform: translate(0, 0);
    width: 100%;
    max-width: 310px;
  }
`;

const infoWrapperAnimation = keyframes`
	0% {
		max-height: 0;
	}
	50% {
		max-height: 0;
	}
	100% {
		max-height: 400px;
		overflow: visible;
	}
`;

const StyledInfoWrapper = styled.div<{ $gender: Character['gender'] }>`
  animation: ${infoWrapperAnimation} 0.3s ease-in 0.1s;
  max-height: 0;
  border-radius: 8px;
  overflow: hidden;
  animation-fill-mode: forwards;
  position: relative;
`;

const StyledModalParagraph = styled.p``;

const openInfoAnimation = keyframes`
	from {
		opacity: 0;
  }
  to {
		opacity: 1;
  }
`;

const StyledInfo = styled.div`
  width: 100%;
  display: grid;
  gap: 0 20px;
  opacity: 0;
  padding-left: 200px;
  animation: ${openInfoAnimation} 0.3s ease-in 0.5s;
  animation-fill-mode: forwards;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (max-width: 900px) {
    padding-left: 0;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StyledModalTitle = styled.h2`
  grid-column: span 2;

  @media screen and (max-width: 600px) {
    grid-column: span 1;
  }
`;

const StyledModalStatus = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
`;
