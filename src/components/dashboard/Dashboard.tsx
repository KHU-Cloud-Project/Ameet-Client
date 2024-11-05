/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import LeftPanel from './leftPanel/LeftPanel';
// Import other dashboard-specific components

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// 추후 Modularize

const Header = styled.div`
  height: 60px;
  background-color: ${(props) => props.theme.colors.green};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.typography.fontSize.medium};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadows.section};
`;

const DashboardBody = styled.div`
  display: flex;
  flex: 1;
  padding: 28px 38px 34px 28px; // TRBL
  overflow: hidden;
`;

const BlockWrapper = styled.div`
  display: flex;
  flex: 1;
  gap: 26px;
`;

const BlockColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2.9;
  gap: 18px;
`;

const Block1 = styled.div`
  background-color: ${(props) => props.theme.colors.pastelYellow};
  padding: 16px;
  border-radius: ${(props) => props.theme.borderRadius.small};
  overflow-x: auto;
  white-space: nowrap;
  flex: 1;
`;

const Block2 = styled.div`
  background-color: ${(props) => props.theme.colors.pastelGreen};
  padding: 16px;
  border-radius: ${(props) => props.theme.borderRadius.small};
  flex: 2;
`;

const Block3 = styled.div`
  background-color: ${(props) => props.theme.colors.pastelPurple};
  padding: 16px;
  border-radius: ${(props) => props.theme.borderRadius.small};
  flex: 1;
`;

function Dashboard() {
  return (
    <DashboardContainer>
      <LeftPanel />
      <ContentWrapper>
        <Header>Dashboard Header</Header>
        <DashboardBody>
          <BlockWrapper>
            <BlockColumn>
              <Block1>Block 1 (horizontally scrollable)</Block1>
              <Block2>Block 2</Block2>
            </BlockColumn>
            <Block3>Block 3</Block3>
          </BlockWrapper>
        </DashboardBody>
      </ContentWrapper>
    </DashboardContainer>
  );
}

export default Dashboard;
