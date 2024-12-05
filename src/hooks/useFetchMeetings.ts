import { useCallback, useState } from 'react';
import { Meeting } from '../models/Meeting';
import { fetchMeetingDetailApi } from '../api/meetingApi';

export const useFetchMeetingDetail = () => {
  const [meetingDetail, setMeetingDetail] = useState<Meeting | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMeetingDetail = useCallback(async (meetingId: number) => {
    try {
      setLoading(true);
      setError(null);

      const meetingData = await fetchMeetingDetailApi(meetingId);
      setMeetingDetail(meetingData);
    } catch (err: any) {
      console.error(
        '[useFetchMeetingDetail] Failed to fetch meeting detail:',
        err,
      );
      setError(err.message || 'Failed to fetch meeting detail');
    } finally {
      setLoading(false);
    }
  }, []);

  return { meetingDetail, fetchMeetingDetail, loading, error };
};
