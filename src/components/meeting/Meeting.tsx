/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import EtcBoard from './etcBoard/EtcBoard';
import BotBoard from './botBoard/BotBoard';
import { useRecoilState } from 'recoil';
import { userAtom, UserForTeam } from '../../recoil/atoms/userAtom';
import BoardHeader from '../common/board/header/BoardHeader';
import { Meeting as MeetingType } from '../../models/Meeting';
import PersonBoard from './personBoard/PersonBoard';
import { useEffect, useRef, useState } from 'react';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

type MeetingProps = {
  meeting: MeetingType | null;
  loading: boolean;
  error: string | null;
  teamName: string;
  teamId: number;
};

const MeetingBody = styled.div`
  display: flex;
  flex: 1;
  padding: 28px 15px 28px 15px; // TRBL
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

const Meeting = ({ meeting, teamName, teamId }: MeetingProps) => {
  const [user] = useRecoilState(userAtom);

  if (!user || !user.id) {
    throw new Error('User data is not present.');
  }

  return (
    <>
      <BoardHeader
        title={teamName}
        description={meeting?.participants?.join(', ') || '-'}
        hasSearchbar={false}
        user={user}
        hasLogo={true}
      />
      <MeetingBody>
        <BlockWrapper>
          <PersonBoard participants={meeting?.participants} />
          <BlockColumn>
            <EtcBoard meetingId={meeting?.meetingId ?? 0} />
            <BotBoard />
          </BlockColumn>
        </BlockWrapper>
      </MeetingBody>
    </>
  );
};

export default Meeting;
