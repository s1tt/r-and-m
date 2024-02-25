import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import styled, { keyframes } from 'styled-components';
import Portal from './Portal';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  lazy?: boolean;
  bgColor: string;
}

const ANIMATION_DELAY = 300;

const Modal = ({ children, isOpen, onClose, lazy, bgColor }: ModalProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
        setIsMounted(false);
      }, ANIMATION_DELAY);
    }
  }, [onClose]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeHandler();
      }
    },
    [closeHandler]
  );

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <StyledModal $isOpen={isOpen} $isClosing={isClosing}>
        <StyledModalOverlay onClick={closeHandler}>
          <StyledModalContent
            onClick={onContentClick}
            $isOpen={isOpen}
            $isClosing={isClosing}
            $bgColor={bgColor}
          >
            {children}
          </StyledModalContent>
        </StyledModalOverlay>
      </StyledModal>
    </Portal>
  );
};

export default Modal;

const openModalAnimation = keyframes`
  0% {
		min-height: 0;
		width: 0;
    opacity: 0;
    transform: scale(0.5);
	}
  25% {
    opacity: 1;
    transform: scale(1);
    width: 0;
  }
	50% {
		min-height: 0;
    width: 60vw;
	}
  75% {
		min-height: 0;
  }
	100% {
    width: 60vw;
		min-height: 0;
	}
`;

const closeModalAnimation = keyframes`
	  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.5);
  }
`;

const StyledModal = styled.div<{ $isOpen: boolean; $isClosing: boolean }>`
  position: fixed;
  inset: 0;
  pointer-events: ${props => (props.$isOpen ? 'auto' : 'none')};
  animation: ${props => (props.$isClosing ? closeModalAnimation : 'none')} 0.3s
    ease-in-out;
  animation-fill-mode: forwards;
`;

const StyledModalOverlay = styled.div`
  backdrop-filter: blur(3px);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledModalContent = styled.div<{
  $isOpen: boolean;
  $isClosing: boolean;
  $bgColor: string;
}>`
  border-radius: ${props => props.theme.borderRadius};
  border: solid 3px ${props => props.theme.colors.card.border};
  animation: ${props => (props.$isOpen ? openModalAnimation : 'none')} 0.3s
    ease-in-out;
  animation-fill-mode: forwards;
  box-shadow: 0 0 40px 2px #9dc68e;
  max-width: 768px; //
  width: 0;
  padding: 20px;
  background-color: ${props => props.$bgColor};
`;
