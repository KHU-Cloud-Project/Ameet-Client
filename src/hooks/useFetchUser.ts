import { useRecoilState } from 'recoil';
import { userAtom } from '../recoil/atoms/userAtom';
import { fetchUserApi } from '../api/userApi';

export const useFetchUser = () => {
  const [user, setUser] = useRecoilState(userAtom);

  const fetchUser = async (userId: number) => {
    try {
      console.log('[useFetchUser] Fetching user with ID:', userId);

      if (!user || user.id !== userId) {
        const userData = await fetchUserApi(userId);
        setUser(userData);
        return userData;
      } else {
        console.log('[useFetchUser] Using cached user data');
        return user;
      }
    } catch (error) {
      console.error('[useFetchUser] Failed to fetch user data:', error);
      throw error;
    }
  };

  return { user, fetchUser };
};
