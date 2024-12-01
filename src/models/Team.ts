import { User } from '../recoil/atoms/userAtom';

export type Team = {
  teamId: number;
  name: string;
  description?: string;
  password?: string;
  maxPeople?: number;
  memberNum?: number;
  createdAt?: string;
  role?: 'OWNER' | 'MEMBER';
  members?: User[]; // From team details
};
