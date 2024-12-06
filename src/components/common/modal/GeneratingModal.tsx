import React from 'react';
import styled from '@emotion/styled';
import ModalOverlay from '../../common/modal/ModalOverlay';
import ModalContainer from '../../common/modal/ModalContainer';
import ClipLoader from 'react-spinners/ClipLoader';

const LoadingMessage = styled.div`
  font-size: ${(props) => props.theme.typography.fontSize.large};
  color: ${(props) => props.theme.colors.textGray};
  text-align: center;
  margin-top: 20px;
`;

const GeneratingModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <ModalOverlay onClose={onClose}>
      <ModalContainer onClose={onClose} width="30%" minWidth="300px">
         <ClipLoader color="#6c63ff" size={50} />  
        <LoadingMessage>Generating your note, please wait...</LoadingMessage>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default GeneratingModal;
