/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

type SpaceBlockProps = {
  role: string;
  name: string;
};

type TxtBtnProps = {
  onClick?: () => void;
  children: React.ReactNode;
};

const BlockContainer = styled.div<{ isJoin: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.isJoin ? 'center' : 'start')};
  align-items: ${(props) => (props.isJoin ? 'center' : 'normal')};
  background-color: ${(props) =>
    props.isJoin ? props.theme.colors.white : props.theme.colors.pastelBlue};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: 1.6px solid
    ${(props) =>
      props.isJoin
        ? props.theme.colors.secondary
        : props.theme.colors.pastelBlue};
  padding: 16px;
  height: 142px;
  // width: 180px;
  // margin-bottom: 18px;
  // position: relative;
`;

const SpaceName = styled.h3`
  font-size: ${(props) => props.theme.typography.fontSize.medium};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.colors.textBlack};
  margin-bottom: 5px;
  white-space: break-spaces;
  overflow-wrap: break-word;
`;

const Description = styled.div<{ isRole: boolean }>`
  display: flex;
  flex: ${(props) => (props.isRole ? 1 : 'unset')};
  justify-content: ${(props) => (props.isRole ? 'start' : 'end')};
  font-size: ${(props) => props.theme.typography.fontSize.small};
  font-weight: ${(props) =>
    props.isRole
      ? props.theme.typography.fontWeight.medium
      : props.theme.typography.fontWeight.regular};
  color: ${(props) =>
    props.isRole
      ? props.theme.colors.textGray
      : props.theme.colors.textLightGray};
`;

const TxtBtn = styled.div<TxtBtnProps>`
  cursor: pointer;
  color: ${(props) => props.theme.colors.textLightGray};
  font-size: ${(props) => props.theme.typography.fontSize.small};
  font-weight: ${(props) => props.theme.typography.fontWeight.regular};
  margin-left: 8px;

  &:hover {
    color: ${(props) => props.theme.colors.textGray};
  }
`;

function SpaceBlock({ name, role }: SpaceBlockProps) {
  return (
    <BlockContainer isJoin={false}>
      <SpaceName>{name}</SpaceName>
      <Description isRole={true}>
        {role == 'ADMIN' ? 'Admin' : 'Member'}
      </Description>
      <Description isRole={false}>
        <TxtBtn onClick={() => console.log('Edit clicked')}>Edit</TxtBtn>
        <TxtBtn onClick={() => console.log('Exit clicked')}>Exit</TxtBtn>
      </Description>
    </BlockContainer>
  );
}

export default SpaceBlock;

const CheersIcon = styled.div`
  font-size: 24px;
  color: ${(props) => props.theme.colors.primary};
`;

function JoinSpaceBlock() {
  return (
    <BlockContainer isJoin={true}>
      <SpaceName>Join Space</SpaceName>
      <CheersIcon>🥂</CheersIcon>
    </BlockContainer>
  );
}

export { JoinSpaceBlock };
