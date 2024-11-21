/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import LeftPanel from '../dashboard/leftPanel/LeftPanel';

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
      <LeftPanel />
      <ContentWrapper>{children}</ContentWrapper>
    </LayoutContainer>
  );
}

export default PageLayout;
