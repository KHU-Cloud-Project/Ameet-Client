/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

type CustomBtnProps = {
  text: string;
  padding: string;
  onClick?: () => void;
  disabled?: boolean;
};

const StyledButton = styled.button<{ padding: string }>`
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.typography.fontSize.large};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.colors.secondary};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: 1.8px solid ${(props) => props.theme.colors.secondary};
  cursor: pointer;

  &:hover {
    border: 1.8px solid ${(props) => props.theme.colors.secondary};
  }

  &:disabled {
    color: ${(props) => props.theme.colors.lineGray};
    border: 1.8px solid ${(props) => props.theme.colors.lineGray};
    cursor: default;
  }
`;

const CustomBtn = ({ text, padding, onClick, disabled }: CustomBtnProps) => {
  return (
    <StyledButton padding={padding} onClick={onClick} disabled={disabled}>
      {text}
    </StyledButton>
  );
};

export default CustomBtn;
