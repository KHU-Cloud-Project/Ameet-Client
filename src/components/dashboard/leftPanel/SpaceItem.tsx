/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { AiOutlineCrown, AiOutlineDeploymentUnit } from 'react-icons/ai';
import { Team } from '../../../models/Team';

type SpaceItemProps = {
  team: Team;
};

const Item = styled.div`
  font-size: ${(props) => props.theme.typography.fontSize.medium};
  color: ${(props) => props.theme.colors.textBlack};
  display: flex;
  align-items: center;
  gap: 10px;
`;

function SpaceItem({ team }: SpaceItemProps) {
  const Icon = team.role === 'OWNER' ? AiOutlineCrown : AiOutlineDeploymentUnit;

  return (
    <Item>
      <Icon />
      {team.name}
    </Item>
  );
}

export default SpaceItem;
