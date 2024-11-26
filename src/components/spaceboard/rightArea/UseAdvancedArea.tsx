/** @jsxImportSource @emotion/react */
import BoardContainer from '../../common/board/BoardContainer';
import styled from '@emotion/styled';
import BoardTitle from '../../common/board/BoardTitle';
import { theme } from '../../../styles/theme';
// import { FaCheck } from 'react-icons/fa';
import { HiCheck } from 'react-icons/hi';
import buttonBg from '/src/assets/images/button_bg.png';
import logo from '/src/assets/images/dummy logo.png';

const FeatureStyle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const CheckIcon = styled.div`
  width: 19px;
  height: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.typography.fontSize.xLarge};
  margin-right: 8px;
`;

const BoldText = styled.div`
  font-size: ${(props) => props.theme.typography.fontSize.small};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.colors.textBlack};
  margin-bottom: 2px;
`;

const LightText = styled.div`
  font-size: ${(props) => props.theme.typography.fontSize.xSmall};
  font-weight: ${(props) => props.theme.typography.fontWeight.regular};
  color: ${(props) => props.theme.colors.textGray};
`;

const Feature = ({ bold, light }: { bold: string; light: string }) => {
  return (
    <FeatureStyle>
      <CheckIcon>
        <HiCheck />
      </CheckIcon>
      <div>
        <BoldText>{bold}</BoldText>
        <LightText>{light}</LightText>
      </div>
    </FeatureStyle>
  );
};

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 18px;
  font-size: ${(props) => props.theme.typography.fontSize.mediumLarge};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.colors.white};
  background-image: url(${buttonBg});
  background-size: cover;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  cursor: pointer;
  text-align: center;
  gap: 4px;

  img {
    width: 32px;
    height: 32px;
  }
`;

const UseAdvancedArea = () => {
  return (
    <BoardContainer>
      <BoardTitle
        children=" Use Advanced Features"
        fontSize={theme.typography.fontSize.mediumLarge}
        marginBottom={18}
      />
      <Feature
        bold="Unlimited Group Spaces"
        light="Use unlimited number of spaces!"
      />
      <Feature bold="More Bots" light="Add more bots for your meetings." />
      <Feature
        bold="Faster File Upload"
        light="Upload files faster than ever."
      />
      {/* <Feature
        bold="Unlimited AI Assistant"
        light="Get unlimited AI assistance."
      /> */}
      <div style={{ flex: 1 }}></div>
      <Button>
        <img src={logo} alt="Dummy Logo" />
        <span>Use Premium</span>
      </Button>
    </BoardContainer>
  );
};

export default UseAdvancedArea;
