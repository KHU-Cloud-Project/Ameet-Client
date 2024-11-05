/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import SpaceItem from './SpaceItem';

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  // overflow-y: auto;
  width: 100%;
  padding: 0 20px;
  flex: 1;
`;

function SpaceList() {
  return (
    <List>
      <SpaceItem icon="📊" label="Space 1" />
      <SpaceItem icon="🛒" label="Space 2" />
      <SpaceItem icon="📅" label="Space 3" />
      <SpaceItem icon="📈" label="Space 4" />
      <SpaceItem icon="💬" label="Space 5" />
    </List>
  );
}

export default SpaceList;
