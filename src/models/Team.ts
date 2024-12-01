import { User } from '../recoil/atoms/userAtom';

export type Team = {
  teamId: number;
  name: string;
  createdAt?: string;
  role?: 'OWNER' | 'MEMBER';
  members?: User[];
  // meetingLogs?: MeetingRecord[];
};
