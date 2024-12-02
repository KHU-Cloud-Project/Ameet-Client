import { atom } from 'recoil';

export type User = {
  id: number | null;
  email: string;
  nickname: string;
  profile: string | null;
};

export type UserForTeam = {
  userTeamId: number | null;
  userId: number | null;
  role?: 'OWNER' | 'MEMBER';
  nickname: string;
  introduction?: string | null;
  profile?: string | null;
};

export const userAtom = atom<User | null>({
  key: 'userAtom', // Recoil key
  default: null, // 초기값 null
});
