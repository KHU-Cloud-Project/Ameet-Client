export type Log = {
  meetingId: number;
  noteId?: number;
  title: string;
  summary?: string | null;
  script?: string | null;
  presignedUrl?: string | null;
  createdAt?: string | null;
  startedAt?: string | null;
  duration: string | null;
  participants?: string[] | null;
  members?: string | null;
};
