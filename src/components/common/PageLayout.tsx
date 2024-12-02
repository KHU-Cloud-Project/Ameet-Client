/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import LeftPanel from '../dashboard/leftPanel/LeftPanel';
import { useRecoilValue } from 'recoil';
import { teamsAtom, teamsLoadingAtom } from '../../recoil/atoms/teamAtom';

const LayoutContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

function PageLayout({ children }: { children: React.ReactNode }) {
  const teams = useRecoilValue(teamsAtom);
  const teamsLoading = useRecoilValue(teamsLoadingAtom);

  if (teamsLoading) {
    return <div>Loading teams...</div>;
  }

  if (!teams.length) {
    return <div>No teams found. Join or create a team!</div>;
  }

  return (
    <LayoutContainer>
      <LeftPanel teams={teams} teamsLoading={teamsLoading} />
      <ContentWrapper>{children}</ContentWrapper>
    </LayoutContainer>
  );
}

export default PageLayout;
