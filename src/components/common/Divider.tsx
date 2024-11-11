/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

const DividerLine = styled.div`
  width: 80%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.lineGray};
  margin: 20px 0;
`;

function Divider() {
  return <DividerLine />;
}

export default Divider;
