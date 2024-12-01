import axiosInstance from './axiosInstance';

// Fetch User
export const fetchUserApi = async (userId: number) => {
  const response = await axiosInstance.get('/api/v1/user', {
    params: { userId },
  });
  return response.data?.data;
};

// Signup User
export const signupUserApi = async (data: {
  email: string;
  password: string;
  nickname: string;
  profile: string | null;
}) => {
  const response = await axiosInstance.post('/api/v1/signup', data);
  return response.data;
};
