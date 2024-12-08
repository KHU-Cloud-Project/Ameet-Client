import { useCallback, useState } from 'react';
import { Meeting } from '../models/Meeting';
import { fetchMeetingDetailApi, searchMeetingsApi} from '../api/meetingApi';

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

export const useSearchMeetings = () => {
  const [meetings, setMeetings] = useState<Meeting[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchMeetings = useCallback(
    async (teamId: number, keyword: string): Promise<Meeting[]> => {
      try {
        setLoading(true);
        setError(null);

        const data = { teamId, keyword };
        const meetingsData = await searchMeetingsApi(data);
        setMeetings(meetingsData); // 상태 업데이트
        return meetingsData; // 결과 반환
      } catch (err: any) {
        console.error('[useSearchMeetings] Failed to search meetings:', err);
        setError(err.message || 'Failed to search meetings');
        setMeetings([]); // 에러 시 빈 배열로 초기화
        throw err; // 에러 전달
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { meetings, searchMeetings, loading, error };
};