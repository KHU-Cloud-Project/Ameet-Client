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
  gap: 6px;
  overflow-y: auto;
  width: 100%;
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
