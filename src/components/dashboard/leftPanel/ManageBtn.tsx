/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  padding: 10px 20px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: ${(props) => props.theme.typography.fontSize.medium};
`;

function ManageBtn() {
  return <Button>Manage Spaces</Button>;
}

export default ManageBtn;
