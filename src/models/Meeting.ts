import { UserForTeam } from '../recoil/atoms/userAtom';

export type Meeting = {
  meetingId: number;
  title: string;
  startedAt: string;
  endedAt?: string;
  participants?: UserForTeam[];
  duration?: {
    seconds: number;
    zero: boolean;
    nano: number;
    negative: boolean;
    units: {
      durationEstimated: boolean;
      timeBased: boolean;
      dateBased: boolean;
    }[];
  };
  presignedUrl?: string;
};

export type CreateMeetingRequest = {
  teamId: number;
  title: string;
};
