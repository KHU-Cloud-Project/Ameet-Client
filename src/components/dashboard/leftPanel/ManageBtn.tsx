/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.white};
  padding: 12px 16px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: none;
  cursor: pointer;
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  font-size: ${(props) => props.theme.typography.fontSize.medium};
`;

function ManageBtn() {
  return <Button>Manage Spaces</Button>;
}

export default ManageBtn;
