import { atom } from 'recoil';
import { Meeting } from '../../models/Meeting';

export const meetingStateAtom = atom<Meeting | null>({
  key: 'meetingState',
  default: null,
});

export const isMeetingInProgressAtom = atom<boolean>({
  key: 'isMeetingInProgress',
  default: false,
});
