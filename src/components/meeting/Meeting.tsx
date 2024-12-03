/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import EtcBoard from './etcBoard/EtcBoard';
import BotBoard from './botBoard/BotBoard';
import PersonBoard from './personBoard/PersonBoard';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../recoil/atoms/userAtom';
import BoardHeader from '../common/board/header/BoardHeader';

const MeetingBody = styled.div`
  display: flex;
  flex: 1;
  padding: 28px 15px 28px 15px; // TRBL
  overflow: hidden;
`;

const DummyBoard = styled.div`
  display: flex;
  flex: 2.2;
  gap: 26px;
  overflow: hidden;
`;

const BlockWrapper = styled.div`
  display: flex;
  flex: 1;
  gap: 26px;
  overflow: hidden;
`;

const BlockColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 18px;
  overflow: hidden;
`;

function Meeting() {
  const [user] = useRecoilState(userAtom);

  if (!user || !user.id) {
    throw new Error('User data is not present.');
  }

  const dummyHasSearchbar = true;
  const dummyIsAdmin = true;

  return (
    <>
      <BoardHeader
        title={dummyTitle}
        hasSearchbar={dummyHasSearchbar}
        user={user}
        hasLogo={true}
      />
      <MeetingBody>
        <BlockWrapper>
          <PersonBoard />
          <BlockColumn>
            <EtcBoard />
            <BotBoard />
          </BlockColumn>
        </BlockWrapper>
      </MeetingBody>
    </>
  );
}

export default Meeting;

const dummyTitle = 'Space 1';
const dummyUser = {
  name: 'Cherrie',
  role: 'Member',
  profileImage: 'https://picsum.photos/200',
};

const dummyMembers = [
  {
    imageUrl: 'https://picsum.photos/201',
    nickname: 'Sumin',
    authority: 'Admin',
    introduction: 'I love cloud ☁️ 🌹💘💘',
  },
  {
    imageUrl: 'https://picsum.photos/202',
    nickname: 'SaY',
    authority: 'Member',
    introduction: 'backend developer',
  },
  {
    imageUrl: 'https://picsum.photos/203',
    nickname: 'Cherrie',
    authority: 'Member',
    introduction: 'Sujin so cute',
  },
  {
    imageUrl: 'https://picsum.photos/204',
    nickname: 'Sujin',
    authority: 'Member',
    introduction: 'I AM MZ',
  },
  {
    imageUrl: 'https://picsum.photos/205',
    nickname: 'Gyeongtaek',
    authority: 'Member',
    introduction: 'I AM ZM',
  },
];
