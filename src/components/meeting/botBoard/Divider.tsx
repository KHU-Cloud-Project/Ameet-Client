/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.textBlack};
  margin: 3px 0;
`;

export default Divider;