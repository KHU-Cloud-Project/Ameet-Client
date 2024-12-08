import axios from 'axios';
import { CreateMeetingRequest, Meeting, SearchMeetingRequest} from '../models/Meeting';
import axiosInstance from './axiosInstance';

export const createMeetingApi = async (
  data: CreateMeetingRequest,
): Promise<Meeting> => {
  const response = await axios.post('/api/v1/meeting', data);

  if (response.data?.success && response.status === 201) {
    return response.data.data;
  }

  throw new Error('[MeetingApi] Failed to create meeting');
};

export const fetchMeetingDetailApi = async (meetingId: number) => {
  const response = await axiosInstance.get(`/api/v1/meeting`, {
    params: { meetingId },
  });

  if (response.data?.success && response.status === 200) {
    return response.data.data;
  }

  throw new Error('Failed to fetch team details');
};

export const endMeetingApi = async (meetingId: number) => {
  const response = await axiosInstance.get(`/api/v1/meeting/end`, {
    params: { meetingId },
  });

  if (response.data?.success && response.status === 200) {
    return response.data.data;
  }

  throw new Error('[MeetingApi] Failed to end meeting');
};


export const searchMeetingsApi = async (
  data: SearchMeetingRequest,
): Promise<Meeting[]> => {
  const response = await axiosInstance.post('/api/v1/meeting/search', data);

  if (response.data?.success && response.status === 200) {
    return response.data.data; // API 응답의 데이터를 반환
  }

  throw new Error('[MeetingApi] Failed to search meetings');
};
