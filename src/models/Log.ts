export type Participant = {
  nickname: string;
};

export type Log = {
  id: string;
  name: string;
  date: string;
  length: number;
  participants: Participant[];
  aiSummary?: string;
  originalContent?: string;
};

export const dummyLogs: Log[] = Array.from({ length: 130 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Meeting ${i + 1}`,
  date: `2024-09-01 23:00:01`,
  length: 3799 + i * 10,
  participants: [
    { nickname: 'Say' },
    { nickname: 'Sumin' },
    { nickname: 'User3' },
    { nickname: 'User4' },
  ],
  aiSummary:
    '모든 사람들이 다 과제를 해왔다.\n수진의 과제에서 3번째 페이지의 12번째 줄은 수정이 필요하다.\n어쩌고\n저쩌고',
  originalContent:
    '모든 사람들이 다 과제를 해왔다.\n수진의 과제에서 3번째 페이지의 12번째 줄은 수정이 필요하다.\n\n클라우드 서비스 제공자 선정\nAWS, Microsoft Azure, Google Cloud Platform 중 AWS를 최종 선택함.\n이유: 팀원들이 AWS 환경에 익숙하며, 제공되는 도구와 서비스가 요구사항을 충족.\n\n향후 일정\n- 10월 10일: 초기 클라우드 인프라 구성 완료\n- 10월 15일: 애플리케이션 배포 및 테스트\n- 10월 20일: 데이터 백업 및 모니터링 시스템 설정\n...',
}));
