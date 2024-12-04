import axios from 'axios';
import { CreateMeetingRequest, Meeting } from '../models/Meeting';

export const createMeetingApi = async (
  data: CreateMeetingRequest,
): Promise<Meeting> => {
  const response = await axios.post('/api/v1/meeting', data);

  if (response.data?.success && response.status === 201) {
    return response.data.data;
  }

  throw new Error('[MeetingApi] Failed to create meeting');
};
