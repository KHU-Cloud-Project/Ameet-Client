/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

type DividerProps = {
  width?: string;
  height?: string;
  color?: string;
  marginTop?: string;
  marginBottom?: string;
};
const DividerLine = styled.div<DividerProps>`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '1px'};
  background-color: ${(props) => props.color || props.theme.colors.lineGray};
  margin-top: ${(props) => props.marginTop || '0px'};
  margin-bottom: ${(props) => props.marginBottom || '0px'};
`;

function Divider({
  width,
  height,
  color,
  marginTop,
  marginBottom,
}: DividerProps) {
  return (
    <DividerLine
      width={width}
      height={height}
      color={color}
      marginTop={marginTop}
      marginBottom={marginBottom}
    />
  );
}

export default Divider;
