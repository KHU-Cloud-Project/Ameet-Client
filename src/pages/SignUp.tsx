/** @jsxImportSource @emotion/react */
import { ChangeEvent, useState } from 'react';
import styled from '@emotion/styled';
import { Spacer } from '../components/common/Spacer';
import { useNavigate } from 'react-router';
import backgroundImg from '../assets/images/login bg.png';
// import logo from '../assets/dummy logo.png';

const ProfilePicContainer = styled.div`
  width: 120px;
  height: 120px;
  border: 2px dashed ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ProfilePicPreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FileInput = styled.input`
  display: none;
`;

const BackgroundWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  box-sizing: border-box;
  border-radius: 12px; /* 모서리를 둥글게 설정 */
  transform: translateY(-60px); /* 컨테이너 전체를 위로 올림 */
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 20px;
  align-self: flex-start; /* 텍스트를 왼쪽에 정렬 */
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textBlack}; /* 텍스트 색상 설정 */
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.green};
  }
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
    &:disabled {
    background-color: ${({ theme }) => theme.colors.textGray};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8rem;
  align-self: flex-start; /* 오류 메시지를 왼쪽에 정렬 */
  margin-bottom: 5px;
`;

const LoginLink = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1000;
  text-align: center;
`;

const ModalText = styled.p`
  font-size: 1rem;
  margin-bottom: 20px;
  text-align: center;
  line-height: 1.5; /* 줄 간격 조정 */
  word-break: keep-all; /* 긴 단어가 있을 때 줄이 자연스럽게 나눠지도록 */
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [profilepic, setProfilePic] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showmodal, setShowModal] = useState(false);

  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]; 
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file)); // 미리보기 URL 생성
    }
  };

  const isEmailValid = email.includes('@');
  const isPasswordLengthValid = password.length >= 4 && password.length <= 10;
  const doPasswordsMatch =  password === confirmpassword;
  const isNicknameValid = nickname.length > 0;

  const isFormValid = 
  isEmailValid && 
  isPasswordLengthValid && 
  password && 
  confirmpassword && 
  doPasswordsMatch &&
  isNicknameValid;

  const handleSignUp = () => {
    if (isFormValid) {
        setShowModal(true);
      }
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    navigate('/login'); // 로그인 페이지로 이동
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  return (
    <BackgroundWrapper>
        <Container>
      <Title>Create an Account</Title>
      <ProfilePicContainer onClick={() => document.getElementById('fileInput')?.click()}>
        {preview ? <ProfilePicPreview src={preview} alt="Profile Preview" /> : <span>+</span>}
        <FileInput
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleProfilePicChange}
        />
      </ProfilePicContainer>
      {/* {preview && <ProfileImage src={preview} alt="Profile Preview" />}
        <input type="file" accept="image/*" onChange={handleProfilePicChange} /> */}
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {!isEmailValid && email && <ErrorMessage>유효한 이메일 주소를 입력하세요.</ErrorMessage>}
      
      <Input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        {!isNicknameValid && nickname && <ErrorMessage>닉네임을 입력해주세요.</ErrorMessage>}
        
      <Input
        type="password"
        placeholder="Password (4~10자리)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
        {!isPasswordLengthValid && password && <ErrorMessage>비밀번호는 4~10자리여야 합니다.</ErrorMessage>}
      <Input
        type="password"
        placeholder="Password (비밀번호 확인)"
        value={confirmpassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {!doPasswordsMatch && confirmpassword && <ErrorMessage>비밀번호가 일치하지 않습니다!</ErrorMessage>}

      <Spacer height={30} />
      <Button onClick={handleSignUp} disabled={!isFormValid}>Sign Up!</Button>
      <LoginLink onClick={handleNavigateToLogin}>Already have an account? Login</LoginLink>
      {showmodal && (
          <Modal>
            <ModalText>회원가입이 완료되었습니다!</ModalText>
            <Button onClick={handleModalConfirm}>확인</Button>
          </Modal>
      )}
    </Container>
    </BackgroundWrapper>
  );
};

export default SignUp;
