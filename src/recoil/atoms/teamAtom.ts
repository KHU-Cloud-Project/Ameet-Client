import { atom } from 'recoil';
import { Team } from '../../models/Team';

export const teamsAtom = atom<Team[]>({
  key: 'teamsAtom',
  default: [],
});

export const teamsLoadingAtom = atom({
  key: 'teamsLoading',
  default: true,
});
