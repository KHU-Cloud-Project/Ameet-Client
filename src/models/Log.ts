export interface Log {
  meetingId: number | null;
  noteId: number;
  title: string;
  summary: string;
  script: string;
  participants: string[];
  presignedUrl: string;
  startedAt: string;
  duration: string | null;
  createdAt: string | null;
  members: string | null;
}
