import { useRecoilState } from 'recoil';
import { userAtom } from '../recoil/atoms/userAtom';
import { fetchUserApi } from '../api/userAPI';

export const useFetchUser = () => {
  const [user, setUser] = useRecoilState(userAtom);

  const fetchUser = async (userId: number) => {
    try {
      if (!user) {
        console.log('Fetching user with ID:', userId);
        const userData = await fetchUserApi(userId);
        setUser(userData);
        return userData;
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
