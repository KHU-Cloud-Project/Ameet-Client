import { atom } from 'recoil';
import { Note, NoteUploadResponse } from '../../models/Note';

export const noteAtom = atom<Note | null>({
  key: 'noteAtom', 
  default: null, 
});

export const uploadResponseAtom = atom<NoteUploadResponse | null>({
    key: 'uploadResponseAtom', 
    default: null,             
  });