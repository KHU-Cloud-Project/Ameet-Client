import { UserForTeam } from '../recoil/atoms/userAtom';

export type Note = {
  meetingId: number;
  noteId?: number;
  title: string;
  summary?: string | null;
  script?: string | null;
  presignedUrl?: string | null;
  createdAt?: string | null;
  startedAt?: string | null;
  duration: string | null;
  participants?: UserForTeam[] | null;
};

export type NoteUploadRequest = {
    title: string;
    members: string;
    createdDate: string;
  };
  
  export interface NoteUploadResponse {
    success: boolean;
    status: number;
    data: {
      presignedUrl: string;
      noteId: number;
    };
    timestamp: string;
  }
  