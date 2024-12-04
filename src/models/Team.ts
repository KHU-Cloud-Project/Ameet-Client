import { UserForTeam } from '../recoil/atoms/userAtom';

export type Team = {
  teamId: number;
  userTeamId?: number;
  name: string;
  createdAt?: string;
  role?: 'OWNER' | 'MEMBER';
  description?: string;
  password?: string;
  maxPeople?: number;
  memberNum?: number;
  memberList?: UserForTeam[];
};
