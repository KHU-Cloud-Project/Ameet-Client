/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import settingIcon from '../../../assets/icons/dashboard/setting.png';
import signOutIcon from '../../../assets/icons/dashboard/signOut.png';
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

const IconImage = styled.img`
  width: 24px; 
  height: 24px;
`;

function BottomOptions() {
  return (
    <OptionsContainer>
      <OptionItem>
        <IconImage src={settingIcon} alt="settingIcon" /> Settings</OptionItem>
      <OptionItem>
        <IconImage src={signOutIcon} alt="signOutIcon" />Sign Out</OptionItem>
    </OptionsContainer>
  );
}

export default BottomOptions;
