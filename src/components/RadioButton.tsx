import React from 'react';
import styled from 'styled-components';

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: string;
}

const RadioButton = ({ value, label, checked, ...props }: RadioButtonProps) => {
  return (
    <StyledRadioButton checked={checked ?? false}>
      <StyledInput type='checkbox' value={value} {...props} />
      <StyledLabel $checked={checked ?? false}>{label}</StyledLabel>
    </StyledRadioButton>
  );
};

export default RadioButton;

const StyledRadioButton = styled.label<{ checked: boolean }>`
  display: inline-flex;
  cursor: pointer;
`;

const StyledInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  pointer-events: none;
  left: -999999999px;
  display: none;
  visibility: hidden;
  border: none;
  outline: none;

  &:disabled + span {
    opacity: 0.5;
  }
`;

const StyledLabel = styled.span<{ $checked: boolean }>`
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid
    ${props => (props.$checked ? props.theme.colors.card.border : '#000')};
  color: ${props => (props.$checked ? props.theme.colors.card.border : '#fff')};
  cursor: pointer;
  fill: #000;
  outline: 0;
  padding: 5px 15px;
  transition: all 0.3s;
  box-shadow: inset 0 -5px 45px rgba(100, 100, 100, 0.2),
    0 1px 1px rgba(255, 255, 255, 0.2);

  &:focus {
    color: #171e29;
  }

  &:hover {
    opacity: ${props => (props.$checked ? 0.7 : 1)};
    border-color: ${props => props.theme.colors.card.border};
    color: ${props => props.theme.colors.card.border};
  }
`;
