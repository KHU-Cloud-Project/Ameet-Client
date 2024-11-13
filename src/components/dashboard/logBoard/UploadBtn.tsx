import styled from '@emotion/styled';

type UploadBtnProps = {
  onClick?: () => void;
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  font-size: ${(props) => props.theme.typography.fontSize.small};
  color: ${(props) => props.theme.colors.textGray};
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.borderRadius.small};
  border: 1.2px solid ${(props) => props.theme.colors.lineGray};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.background};
    border: 1.2px solid ${(props) => props.theme.colors.lineGray};
    color: ${(props) => props.theme.colors.textDarkGray};
  }
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
`;

function UploadBtn({ onClick }: UploadBtnProps) {
  return (
    <StyledButton onClick={onClick}>
      <Icon src="/src/assets/icons/dashboard/upload.png" alt="Upload" />
      Upload
    </StyledButton>
  );
}

export default UploadBtn;
