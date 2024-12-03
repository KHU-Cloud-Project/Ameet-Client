/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
// import LeftPanel from '../dashboard/leftPanel/LeftPanel';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

function MeetingPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutContainer>
      {/* <LeftPanel /> */}
      <ContentWrapper>{children}</ContentWrapper>
    </LayoutContainer>
  );
}

export default MeetingPageLayout;
