/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

type SpaceItemProps = {
  icon: string;
  label: string;
};

const Item = styled.div`
  font-size: ${(props) => props.theme.typography.fontSize.medium};
  color: ${(props) => props.theme.colors.textBlack};
  display: flex;
  align-items: center;
  gap: 10px;
`;

function SpaceItem({ icon, label }: SpaceItemProps) {
  return (
    <Item>
      <span>{icon}</span>
      {label}
    </Item>
  );
}

export default SpaceItem;
