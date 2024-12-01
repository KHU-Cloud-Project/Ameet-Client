/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import Logo from './Logo';
import SpaceList from './SpaceList';
import BottomOptions from './BottomOptions';
import ManageBtn from './ManageBtn';
import { Spacer } from '../../common/Spacer';
import Divider from '../../common/Divider';
import DummySignupButton from '../DummySignupBtn';
import { Team } from '../../../models/Team';

type LeftPanelProps = {
  teams: Team[];
  teamsLoading: boolean;
};

const Panel = styled.div`
  width: clamp(220px, 18vw, 260px);
  background-color: ${(props) => props.theme.colors.white};
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-right: 1px solid ${(props) => props.theme.colors.lightGray};
  white-space: nowrap;
`;

function LeftPanel({ teams, teamsLoading }: LeftPanelProps) {
  return (
    <Panel>
      <DummySignupButton />
      <div style={{ padding: '30px 12px' }}>
        <Logo />
        <Spacer height={66} />
        <ManageBtn />
        <Spacer height={24} />
        {teamsLoading ? (
          <div>Loading spaces...</div>
        ) : (
          <SpaceList teams={teams} />
        )}
      </div>
      <div style={{ width: '100%', paddingBottom: '38px' }}>
        <Divider />
        <Spacer height={36} />
        <BottomOptions />
      </div>
    </Panel>
  );
}

export default LeftPanel;
