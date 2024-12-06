import { useCallback, useState } from 'react';
import { Note } from '../models/Note';
import { fetchNoteApi } from '../api/noteApi';

export const useFetchNote = () => {
  const [note, setNote] = useState<Note | null>(null); 
  const [loading, setLoading] = useState(false);      
  const [error, setError] = useState<string | null>(null); 

  const fetchNote = useCallback(async (noteId: number) => {
    if (loading) return; 
    try {
      setLoading(true);
      setError(null);

      const response = await fetchNoteApi(noteId); 
      setNote(response);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch note');
    } finally {
      setLoading(false);
    }
  }, [loading]);

  return { note, fetchNote, loading, error };
};
