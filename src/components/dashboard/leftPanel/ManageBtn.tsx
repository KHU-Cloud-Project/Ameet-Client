/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.white};
  padding: 12px 16px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: none;
  cursor: pointer;
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  font-size: ${(props) => props.theme.typography.fontSize.medium};

  &:hover {
    color: ${(props) => props.theme.colors.background};
  }
`;

function ManageBtn() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/space');
  };

  return <Button onClick={handleClick}>Manage Spaces</Button>;
}

export default ManageBtn;
