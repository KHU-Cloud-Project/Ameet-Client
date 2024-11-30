import axiosInstance from '../api/axiosInstance';

export const useFetchSignup = () => {
  const signupUser = async (data: {
    email: string;
    password: string;
    nickname: string;
    profile: string | null;
  }) => {
    try {
      console.log('Signing up user:', data);
      const response = await axiosInstance.post('/api/v1/signup', data);
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('[useFetchSignup] Failed to signup user:', error);
      throw error;
    }
  };

  return { signupUser };
};
