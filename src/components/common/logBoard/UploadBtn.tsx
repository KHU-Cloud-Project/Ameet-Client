/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useState } from 'react';
import UploadModal from './UploadModal';
import GeneratingModal from '../modal/GeneratingModal';

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
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isGeneratingModalOpen, setIsGeneratingModalOpen] = useState(false);

  const openUploadModal = () => setIsUploadModalOpen(true);
  const closeUploadModal = () => setIsUploadModalOpen(false);

  const handleUploadComplete = () => {
    closeUploadModal();
    setTimeout(() => setIsGeneratingModalOpen(true), 300);
    setTimeout(() => {
      setIsGeneratingModalOpen(false);
    }, 30000);
  };

  return (
    <>
      <StyledButton onClick={openUploadModal}>
        <Icon src="/src/assets/icons/dashboard/upload.png" alt="Upload" />
        Upload
      </StyledButton>

      {isUploadModalOpen && (
        <UploadModal
          onClose={closeUploadModal}
          onUploadComplete={handleUploadComplete} 
        />
      )}

      {isGeneratingModalOpen && <GeneratingModal onClose={() => setIsGeneratingModalOpen(false)} />}

    </>
  );
}

export default UploadBtn;
