/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import settingIcon from '/assets/icons/dashboard/setting.png';
import signOutIcon from '/assets/icons/dashboard/signOut.png';
import { useResetRecoilState } from 'recoil';
import { userAtom } from '../../../recoil/atoms/userAtom';
import { useNavigate } from 'react-router';
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

const useLogout = () => {
  const resetUser = useResetRecoilState(userAtom);
  const navigate = useNavigate();

  const logout = () => {
    resetUser();

    localStorage.removeItem('user');
    sessionStorage.removeItem('user');

    navigate('/login');
  };

  return logout;
};

function BottomOptions() {
  const logout = useLogout();

  return (
    <OptionsContainer>
      <OptionItem>
        <IconImage src={settingIcon} alt="settingIcon" /> Settings
      </OptionItem>
      <OptionItem onClick={logout}>
        <IconImage src={signOutIcon} alt="signOutIcon" />
        Sign Out
      </OptionItem>
    </OptionsContainer>
  );
}

export default BottomOptions;
