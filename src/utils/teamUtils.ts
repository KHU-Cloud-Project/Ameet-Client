// 프론트에서 정의한 타입이랑 서버 res normalize

import { Team } from '../models/Team';
import { UserForTeam } from '../recoil/atoms/userAtom';

export const mapTeamListResponse = (response: any[]): Team[] => {
  return response.map((team) => ({
    teamId: team.teamId,
    name: team.name,
    createdAt: team.createdAt,
    role: team.role,
  }));
};

export const mapTeamDetailResponse = (response: any): Team => {
  return {
    teamId: response.teamId,
    name: response.name,
    description: response.description,
    password: response.password,
    maxPeople: response.maxPeople,
    memberNum: response.memberNum,
    createdAt: response.createdAt,
    memberList: response.memberList.map(
      (user: UserForTeam): UserForTeam => ({
        userTeamId: user.userTeamId,
        userId: user.userId,
        role: user.role,
        nickname: user.nickname,
        introduction: user.introduction,
        profile: user.profile,
      }),
    ),
  };
};
