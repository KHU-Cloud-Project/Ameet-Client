/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import { Spacer } from '../components/common/Spacer';
import { useNavigate } from 'react-router';
import logo from '../assets/dummy logo.png';
import { useEffect } from 'react';

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

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 100px;
`;

const Icon = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 10px;
`;

const ServiceName = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

// const Title = styled.h1`
//   font-size: 1.8rem;
//   color: ${({ theme }) => theme.colors.primary};
//   margin-bottom: 20px;
// `;

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

const RememberMeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textGray};
  margin: 10px 0;
`;

const RememberMeLabel = styled.label`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  appearance: none;
  margin-right: 5px;
  width: 16px;
  height: 16px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
  cursor: pointer;
  
  &:checked {
    background-color: ${({ theme }) => theme.colors.primary};
    position: relative;
  }

  &:checked::before {
    content: '✔';
    color: white;
    font-size: 12px;
    position: absolute;
    top: 1px;
    left: 3px;
  }
`;

const ForgotPassword = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  &:hover {
    text-decoration: underline;
  }
`;

const SignUpButton = styled.button`
  align-self: flex-middle; /* 오른쪽 정렬 */  
  font-size: 0.8rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
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
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

    // 컴포넌트가 마운트될 때 로컬스토리지에서 데이터를 가져옴
    useEffect(() => {
      const storedEmail = localStorage.getItem('email');
      const storedPassword = localStorage.getItem('password');
      if (storedEmail && storedPassword) {
        setEmail(storedEmail);
        setPassword(storedPassword);
        setRememberMe(true);
      }
    }, []);

  const handleLogin = () => {
    if (rememberMe) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }
    console.log('로그인 정보', { email, password });
    navigate('/');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <Container>
      <Header>
        <Icon src={logo} alt="A-Meet logo" />
        <ServiceName>A-Meet</ServiceName>
      </Header>
      
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <RememberMeContainer>
        <RememberMeLabel>
          <Checkbox
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember Me
        </RememberMeLabel>
        <ForgotPassword>Forgot Password?</ForgotPassword>
      </RememberMeContainer>

      <Spacer height={30} />
      <Button onClick={handleLogin}>Log In</Button>
      <SignUpButton onClick={handleSignUp}>sign up with e-mail</SignUpButton>
    </Container>
  );
};

export default Login;
