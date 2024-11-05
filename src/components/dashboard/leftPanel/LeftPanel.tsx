/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import Logo from './Logo';
import SpaceList from './SpaceList';
import BottomOptions from './BottomOptions';
import ManageBtn from './ManageBtn';
import Divider from '../../common/Divider';
import { Spacer } from '../../common/Spacer';

const Panel = styled.div`
  width: clamp(220px, 18vw, 260px);
  background-color: ${(props) => props.theme.colors.white};
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

function LeftPanel() {
  return (
    <Panel>
      <div>
        <Logo />
        <Spacer height={90} />
        <ManageBtn />
        <SpaceList />
      </div>
      <div>
        <Divider />
        <BottomOptions />
      </div>
    </Panel>
  );
}

export default LeftPanel;
