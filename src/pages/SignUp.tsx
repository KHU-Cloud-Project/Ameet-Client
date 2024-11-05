/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import { Spacer } from '../components/common/Spacer';
import { useNavigate } from 'react-router';
// import logo from '../assets/dummy logo.png';

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
  transform: translateY(-120px); /* 컨테이너 전체를 위로 올림 */
`;

const Title = styled.h1`
  font-size: 1.2rem;
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
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const isEmailValid = email.includes('@');

  const isPasswordLengthValid = password.length >= 4 && password.length <= 10;

  const doPasswordsMatch =  password === confirmpassword;
  const isFormValid = isEmailValid && isPasswordLengthValid && password && confirmpassword && doPasswordsMatch;

  const handleSignUp = () => {
    if (isFormValid) {
        // 실제 Sign Up 로직 수행
        navigate('/signup');
      }
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  return (
    <Container>
      <Title>Create an Account</Title>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {!isEmailValid && email && <ErrorMessage>유효한 이메일 주소를 입력하세요.</ErrorMessage>}
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
    </Container>
  );
};

export default SignUp;
