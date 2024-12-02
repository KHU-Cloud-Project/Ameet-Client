import { CustomMemberBlockProps } from './CustomMemberBlock'; // CustomMemberBlockProps를 가져옴

export const getParticipantLayout = (participants: CustomMemberBlockProps[]): number[][] => {
  const layouts: Record<number, number[][]> = {
    1: [[1]],
    2: [[2]],
    3: [[2], [1]],
    4: [[2, 2]],
    5: [[3], [2]],
    6: [[3, 3]],
    7: [[2], [3], [2]],
    8: [[3], [2], [3]],
  };

  return layouts[participants.length] || [];
};