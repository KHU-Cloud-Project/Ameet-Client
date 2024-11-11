/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const OptionItem = styled.div`
  font-size: ${(props) => props.theme.typography.fontSize.small};
  color: ${(props) => props.theme.colors.textGray};
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

function BottomOptions() {
  return (
    <OptionsContainer>
      <OptionItem>⚙️ Settings</OptionItem>
      <OptionItem>↩️ Sign Out</OptionItem>
    </OptionsContainer>
  );
}

export default BottomOptions;
