import {
  CreateMeetingRequest,
  Meeting,
  SearchMeetingRequest,
} from '../models/Meeting';
import axiosInstance from './axiosInstance';

export const createMeetingApi = async (
  data: CreateMeetingRequest,
): Promise<Meeting> => {
  const response = await axiosInstance.post('/api/v1/meeting', data);

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
    return response.data.data;
  }

  throw new Error('[MeetingApi] Failed to search meetings');
};

export const uploadFileToMeetingPresignedUrl = async (
  presignedUrl: string,
  file: File,
): Promise<void> => {
  try {
    const response = await axiosInstance.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Failed to upload file. Status code: ${response.status}`);
    }

    console.log('File uploaded successfully to S3');
  } catch (error) {
    console.error('Error uploading file to presigned URL:', error);
    throw error;
  }
};

export const getSummaryBotApi = async (meetingId: number) => {
  const response = await axiosInstance.get('/api/v1/bot/summary', {
    params: { meetingId },
  });
  if (response.data?.success && response.status === 200) {
    return response.data.data;
  }
  throw new Error('Failed to fetch team details');
};

export const getPositiveBotApi = async (meetingId: number) => {
  const response = await axiosInstance.get('/api/v1/bot/positive', {
    params: { meetingId },
  });
  if (response.data?.success && response.status === 200) {
    return response.data.data;
  }
  throw new Error('Failed to fetch team details');
};

export const getNegativeBotApi = async (meetingId: number) => {
  const response = await axiosInstance.get('/api/v1/bot/negative', {
    params: { meetingId },
  });
  if (response.data?.success && response.status === 200) {
    return response.data.data;
  }
  throw new Error('Failed to fetch team details');
};
