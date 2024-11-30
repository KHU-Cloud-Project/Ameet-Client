import { useRecoilState } from 'recoil';
import axiosInstance from '../api/axiosInstance';
import { userAtom } from '../recoil/atoms/userAtom';

export const useFetchUser = () => {
  const [user, setUser] = useRecoilState(userAtom);

  const fetchUser = async (userId: number) => {
    try {
      if (!user) {
        console.log('Fetching user with ID:', userId);
        const response = await axiosInstance.get('/api/v1/user', {
          params: { userId },
        });
        console.log('API Response:', response.data);

        const { id, email, nickname, profile } = response.data.data;
        setUser({ id, email, nickname, profile });
        return response.data.data;
      } else {
        console.log('Using cached user data');
        return user;
      }
    } catch (error) {
      console.error('[useFetchUser] Failed to fetch user data:', error);
      throw error;
    }
  };

  return { user, fetchUser };
};
