/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import LeftPanel from '../dashboard/leftPanel/LeftPanel';
import { MOCK_USER_ID } from '../../constants/mockUser';

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
  return (
    <LayoutContainer>
      <LeftPanel userId={MOCK_USER_ID} />
      <ContentWrapper>{children}</ContentWrapper>
    </LayoutContainer>
  );
}

export default PageLayout;
