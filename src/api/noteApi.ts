import { selector } from 'recoil';
import axiosInstance from '../api/axiosInstance';
import { Note, NoteUploadRequest, NoteUploadResponse } from '../models/Note';
import { noteAtom } from '../recoil/atoms/noteAtom';

export const createNoteApi = async (noteId: number): Promise<Note> => {
    const response = await axiosInstance.get<Note>(`/api/v1/note/create`, {
      params: { noteId },
    });
    if (response.status === 200) {
      return response.data; // Note 데이터 반환
    }
    throw new Error('Failed to fetch note');
  };
  
export const uploadNoteApi = async (
    data: NoteUploadRequest
  ): Promise<NoteUploadResponse> => {
    try {
      console.log('Sending data to server:', data); 
      const response = await axiosInstance.post<NoteUploadResponse>(
        '/api/v1/note/upload',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Server response:', response); 
  
      if (response.status === 201) {
        return response.data;
      }
  
      throw new Error(`Unexpected status code: ${response.status}`);
    } catch (error) {
      console.error('Error in uploadNoteApi:', error);
      throw error;
    }
  };
  
  
  
  export const noteSelector = selector<Note | null>({
    key: 'noteSelector_unique', 
    get: async ({ get }) => {
      const currentNote = get(noteAtom);
      if (currentNote) return currentNote;
      return null;
    },
    set: async ({ set }, newNoteId) => {
      if (typeof newNoteId === 'number') {
        const note = await createNoteApi(newNoteId);
        set(noteAtom, note); 
      }
    },
  });
  
  export const uploadFileToPresignedUrl = async (
    presignedUrl: string,
    file: File
  ): Promise<void> => {
    try {
      const response = await axiosInstance.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });
  
      if (response.status !== 200) {
        throw new Error(`Failed to upload file. Status code: ${response.status}`);
      }
  
      console.log('File uploaded successfully to S3');
    } catch (error) {
      console.error('Error uploading file to presigned URL:', error);
      throw error;
    }
  };
  
  