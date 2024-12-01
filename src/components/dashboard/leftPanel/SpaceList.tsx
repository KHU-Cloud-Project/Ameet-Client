/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import SpaceItem from './SpaceItem';
import { Team } from '../../../models/Team';

type SpaceListProps = {
  teams: Team[];
};

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  // overflow-y: auto;
  width: 100%;
  padding: 0 20px;
  flex: 1;
`;

function SpaceList({ teams }: SpaceListProps) {
  if (!Array.isArray(teams) || teams.length === 0) {
    return <div>No teams available</div>;
  }

  return (
    <List>
      {teams.map((team) => (
        <SpaceItem key={team.teamId} team={team} />
      ))}
    </List>
  );
}

export default SpaceList;
