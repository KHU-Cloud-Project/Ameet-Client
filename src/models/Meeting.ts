export type Meeting = {
  meetingId: number;
  title: string;
  startedAt: string;
  endedAt?: string;
  participants?: string[];
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

export type SearchMeetingRequest = {
  teamId: number;
  keyword: string;
};

export type SearchMeetingResponse = {
  meetingId: number;
  title: string;
  startedAt: string;
  duration: {
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
  participants: string[];
}[];
