/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ModalOverlay from '../../common/modal/ModalOverlay';
import ModalContainer from '../../common/modal/ModalContainer';
import InputLabel from '../InputLabel';
import { AiOutlineClose } from 'react-icons/ai';
import uploadIcon from '/src/assets/icons/meetingLogs/upload_file.png';
import DatePicker from './DatePicker';
import CustomBtn from '../CustomBtn';
import { useFetchNote } from '../../../hooks/useFetchNotes';
import { NoteUploadRequest } from '../../../models/Note';
import { uploadFileToPresignedUrl, createNoteApi } from '../../../api/noteApi';

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
  margin-bottom: 38px;
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

const UploadModal = ({ onClose, onUploadComplete }: { onClose: () => void; onUploadComplete: () => void }) => {
  const [title, setTitle] = useState('');
  const [members, setMembers] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { uploadNote } = useFetchNote();

  const handleUpload = async () => {
    if (!title || !members || !selectedDate || !uploadedFile) {
      alert('Please fill in all required fields and upload a file.');
      return;
    }
  
    const formattedDate = `${selectedDate.getFullYear()}-${String(
      selectedDate.getMonth() + 1
    ).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')} ${String(
      selectedDate.getHours()
    ).padStart(2, '0')}:${String(selectedDate.getMinutes()).padStart(2, '0')}:${String(
      selectedDate.getSeconds()
    ).padStart(2, '0')}`;

  
    const requestData: NoteUploadRequest = {
      title,
      members,
      createdDate: formattedDate,
    };
  
    try {
      console.log('Uploading data:', requestData);
      onClose();
      onUploadComplete();
      const response = await uploadNote(requestData);
      console.log('Upload response:', response);
  
      const presignedUrl = response?.data?.presignedUrl; 
      const noteId = response?.data?.noteId;
    
      if (!presignedUrl || noteId === undefined) {
        console.error('Presigned URL or Note ID is undefined. Cannot proceed.');
        return;
      }
      
      const baseUrl = getBaseUrl(presignedUrl)
  
      console.log('Uploading file to S3...');
      await FileUpload(baseUrl, uploadedFile);
  
      const createdNote = await createNoteApi(noteId);
      console.log('Created Note:', createdNote);

    } catch (err) {
      console.error('Error uploading note or file:', err);
    }
  };


  const getBaseUrl = (url: string): string => {
    const parsedUrl = new URL(url);
    return `${parsedUrl.origin}${parsedUrl.pathname}`;
  };

  const FileUpload = async (presignedUrl: string, file: File) => {
    try {
      console.log('Uploading file to S3...');
      await uploadFileToPresignedUrl(presignedUrl, file); 
    } catch (error) {
      console.error('Failed to upload file:', error);
    }
  };


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
    maxSize: 100 * 1024 * 1024, // 100 MB
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
            <DatePicker
              label="Date and Time"
              selectedDate={selectedDate}
              onChange={setSelectedDate}
            />
          </RightColumn>
        </Content>
        <CustomBtn
          text="Upload"
          padding="14px 28px"
          onClick={() => {
            handleUpload();
          }}
          disabled={!title || !members || !selectedDate}
        />
      </ModalContainer>
    </ModalOverlay>
    
  );
};

export default UploadModal;
