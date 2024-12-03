/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useState } from 'react';
import UploadModal from './UploadModal';

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

function UploadBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <StyledButton onClick={openModal}>
        <Icon src="/src/assets/icons/dashboard/upload.png" alt="Upload" />
        Upload
      </StyledButton>
      {isModalOpen && <UploadModal onClose={closeModal} />}
    </>
  );
}

export default UploadBtn;
