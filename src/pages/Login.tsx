import { useNavigate } from 'react-router-dom';
import { Spacer } from '../components/common/Spacer';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Login Page</h2>
      <Spacer height={30} />
      <button onClick={handleLogin}>대시보드 페이지로 이동</button>
    </div>
  );
};

export default Login;
