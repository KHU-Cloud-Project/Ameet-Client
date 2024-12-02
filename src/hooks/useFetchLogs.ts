import { useCallback, useState } from 'react';
import { Log } from '../models/Log';
import { fetchMeetingLogsApi } from '../api/logApi';

export const useFetchLogs = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(
    async (teamId: number, page: number, size: number) => {
      if (loading) return;
      try {
        setLoading(true);
        setError(null);

        const { content, totalPages, totalElements } =
          await fetchMeetingLogsApi(teamId, page, size);

        setLogs(content);
        setTotalPages(totalPages);
        setTotalElements(totalElements);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch meeting logss');
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { logs, totalPages, totalElements, fetchLogs, loading, error };
};
