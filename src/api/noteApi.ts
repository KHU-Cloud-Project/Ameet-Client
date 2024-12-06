import { selector } from 'recoil';
import axiosInstance from '../api/axiosInstance';
import { Note, NoteUploadRequest, NoteUploadResponse } from '../models/Note';
import { noteAtom } from '../recoil/atoms/noteAtom';

export const fetchNoteApi = async (noteId: number): Promise<Note> => {
  const response = await axiosInstance.get<Note>('/api/v1/note/create', {
    params: { noteId },
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error('Failed to fetch note');
};

export const uploadNoteApi = async (
    data: NoteUploadRequest
  ): Promise<NoteUploadResponse> => {
    const response = await axiosInstance.post<NoteUploadResponse>(
      '/api/v1/note/upload',
      data
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to upload note');
  };
  
  
  export const noteSelector = selector<Note | null>({
    key: 'noteSelector',
    get: async ({ get }) => {
      const currentNote = get(noteAtom);
      if (currentNote) return currentNote;
      return null;
    },
    set: async ({ set }, newNoteId) => {
      if (typeof newNoteId === 'number') {
        const note = await fetchNoteApi(newNoteId).catch((err) => {
          console.error('Error fetching note:', err);
          throw new Error('Failed to fetch note');
        });
        set(noteAtom, note);
      } else {
        console.error('Invalid newNoteId provided to noteSelector.set');
      }
    },
  });

