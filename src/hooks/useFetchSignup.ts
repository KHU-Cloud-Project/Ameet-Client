import { signupUserApi } from '../api/userAPI';

export const useFetchSignup = () => {
  const signupUser = async (data: {
    email: string;
    password: string;
    nickname: string;
    profile: string | null;
  }) => {
    try {
      console.log('Signing up user:', data);
      return await signupUserApi(data);
    } catch (error) {
      console.error('[useFetchSignup] Failed to signup user:', error);
      throw error;
    }
  };

  return { signupUser };
};
