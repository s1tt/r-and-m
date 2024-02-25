import styled, { keyframes } from 'styled-components';
import { Character } from '../types/character';
import { getCharacterColorByStatus } from '../utils/getCharacterColorByStatus';

interface StatusCircleProps {
  status: Character['status'];
}

const StatusCircle = ({ status }: StatusCircleProps) => {
  return <StatusCircleWrapper title={status} $status={status} />;
};

export default StatusCircle;

const pulseRing = keyframes`
  0% {
    transform: scale(.33);
  }
  80%, 100% {
    opacity: 0;
  }
`;

const pulseDot = keyframes`
  0% {
    transform: scale(.8);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(.8);
  }
`;

const StatusCircleWrapper = styled.span<{ $status: Character['status'] }>`
  position: relative;
  display: inline-block;
  width: 15px;
  height: 15px;
  flex-shrink: 0;

  &:before {
    content: '';
    position: absolute;
    left: -50%;
    top: -50%;
    display: block;
    width: 200%;
    height: 200%;
    box-sizing: border-box;
    border-radius: 45px;
    background-color: ${props => getCharacterColorByStatus(props.$status)};
    animation: ${pulseRing} 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: ${props => getCharacterColorByStatus(props.$status)};
    border-radius: 15px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    animation: ${pulseDot} 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite;
  }
`;
