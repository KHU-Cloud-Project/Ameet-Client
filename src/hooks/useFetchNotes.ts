import { useCallback, useState } from 'react';
import { Note, NoteUploadRequest, NoteUploadResponse } from '../models/Note';
import { createNoteApi, uploadNoteApi } from '../api/noteApi';

export const useFetchNote = () => {
  const [note, setNote] = useState<Note | null>(null); 
  const [loading, setLoading] = useState(false);      
  const [error, setError] = useState<string | null>(null); 
  const [uploadResponse, setUploadResponse] = useState<NoteUploadResponse | null>(null); 

  // Note 가져오기
  const createNote = useCallback(async (noteId: number) => {
    if (loading) return;
    try {
      setLoading(true);
      setError(null);

      const response = await createNoteApi(noteId); // Note 가져오기 API 호출
      setNote(response); // Note 상태 업데이트
    } catch (err: any) {
      setError(err.message || 'Failed to fetch note');
    } finally {
      setLoading(false);
    }
  }, [loading]);

  // Note 업로드
  const uploadNote = useCallback(async (data: NoteUploadRequest) => {
    if (loading) return;
    try {
      setLoading(true);
      setError(null);

      const response = await uploadNoteApi(data); 
      setUploadResponse(response); 
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to upload note');
      throw err; 
    } finally {
      setLoading(false);
    }
  }, [loading]);

  return { note, setNote, uploadNote, uploadResponse, loading, error };
};
