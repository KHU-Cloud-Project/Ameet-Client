import { UserForTeam } from '../recoil/atoms/userAtom';

export type Log = {
  meetingId: number;
  title: string;
  date: string;
  duration: number;
  participants?: UserForTeam[] | null;
  aiSummary?: string | null;
  originalContent?: string | null;
};
