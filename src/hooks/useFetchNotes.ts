import { useCallback, useState } from 'react';
import { Note, NoteUploadRequest, NoteUploadResponse } from '../models/Note';
// import { createNoteApi, uploadNoteApi } from '../api/noteApi';
import { uploadNoteApi } from '../api/noteApi';

export const useFetchNote = () => {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadResponse, setUploadResponse] =
    useState<NoteUploadResponse | null>(null);

  // 이상이상!!
  // const fetchNote = useCallback(
  //   async (noteId: number): Promise<Note | void> => {
  //     if (loading) return;
  //     try {
  //       setLoading(true);
  //       setError(null);

  //       const response = await createNoteApi(noteId);
  //       setNote(response);
  //       return response;
  //     } catch (err: any) {
  //       setError(err.message || 'Failed to fetch note');
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   [loading],
  // );

  const uploadNote = useCallback(
    async (data: NoteUploadRequest) => {
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
    },
    [loading],
  );

  return { note, setNote, uploadNote, uploadResponse, loading, error };
};
