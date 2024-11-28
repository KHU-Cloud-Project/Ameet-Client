/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ModalOverlay from '../../common/modal/ModalOverlay';
import ModalContainer from '../../common/modal/ModalContainer';
import InputLabel from '../InputLabel';
import { AiOutlineClose } from 'react-icons/ai';
import uploadIcon from '/src/assets/icons/logs/upload.png';

const TitleArea = styled.div`
  display: inline-block;
  color: ${(props) => props.theme.colors.textBlack};
  font-size: ${(props) => props.theme.typography.fontSize.large};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  margin-bottom: 40px;
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
`;

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  p {
    color: ${(props) => props.theme.colors.textBlack};
    margin-bottom: 10px;
  }

  span {
    font-size: ${(props) => props.theme.typography.fontSize.small};
    color: ${(props) => props.theme.colors.textGray};
  }
`;

const DragAndDropBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed ${(props) => props.theme.colors.lineGray};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: 12px;
  cursor: pointer;
  aspect-ratio: 1.2/1;
  width: 100%;

  &:hover {
    border-color: ${(props) => props.theme.colors.secondary};
  }

  &:focus {
    outline: none;
  }

  .browse {
    color: ${(props) => props.theme.colors.primary};
    cursor: pointer;
    font-size: ${(props) => props.theme.typography.fontSize.default};
    font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  }
`;

const UploadedFileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 8px;
  border: 2px dashed ${(props) => props.theme.colors.lineGray};
  border-radius: ${(props) => props.theme.borderRadius.small};
  gap: 8px;
  span {
    margin: 0;
  }

  button {
    background-color: ${(props) => props.theme.colors.red};
    color: ${(props) => props.theme.colors.red};
    border: none;
    cursor: pointer;
    background: none;
    color: ${(props) => props.theme.colors.textGray};
    cursor: pointer;
  }
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const DatePicker = styled.div`
  width: 100%;
  height: 100px;
  background-color: ${(props) => props.theme.colors.pastelPink};
  border-radius: ${(props) => props.theme.borderRadius.small};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.typography.fontSize.default};
  color: ${(props) => props.theme.colors.textGray};
`;

const UploadModal = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState('');
  const [members, setMembers] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 1) {
      alert('Please upload only one file.');
      return;
    }
    const file = acceptedFiles[0];
    setUploadedFile(file); // Store
    console.log('Uploaded file:', file);
  }, []);

  const deleteFile = () => {
    setUploadedFile(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/mp3': [],
      'audio/mpeg': [],
      'audio/wav': [],
      'audio/aac': [],
    },
    maxSize: 100 * 1024 * 1024, // 10 MB
    onDropRejected: (fileRejections) => {
      const message = fileRejections[0]?.errors[0]?.message || 'File rejected';
      alert(message);
    },
  });

  return (
    <ModalOverlay onClose={onClose}>
      <ModalContainer onClose={onClose} width="46%" minWidth="500px">
        <TitleArea>
          <span>Upload Meeting Audio</span>
        </TitleArea>
        <Content>
          <LeftColumn>
            {!uploadedFile ? (
              <DragAndDropBlock {...getRootProps()}>
                <input {...getInputProps()} />
                <img src={uploadIcon} alt="Upload Icon" width="50" />
                <div style={{ height: '14px' }} />
                {isDragActive ? (
                  <p>Drop your file here...</p>
                ) : (
                  <p>
                    Drag your file or <span className="browse">browse</span>
                  </p>
                )}
                <span>Max 100MB allowed</span>
              </DragAndDropBlock>
            ) : (
              <UploadedFileInfo>
                <span>{uploadedFile.name}</span>
                <button onClick={deleteFile}>
                  <AiOutlineClose />
                </button>
              </UploadedFileInfo>
            )}
            {!uploadedFile && (
              <span>Only supports .mp3, .wav and .aac files</span>
            )}
          </LeftColumn>
          <RightColumn>
            <InputLabel
              label="Title"
              value={title}
              placeholder="Add Meeting Title"
              onChange={(e) => setTitle(e.target.value)}
            ></InputLabel>
            <InputLabel
              label="Members"
              value={members}
              placeholder="Add list of members"
              onChange={(e) => setMembers(e.target.value)}
            ></InputLabel>
            <DatePicker>Date Picker UI</DatePicker>
          </RightColumn>
        </Content>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default UploadModal;
