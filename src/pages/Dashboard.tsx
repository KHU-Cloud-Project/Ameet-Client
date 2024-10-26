import { useNavigate } from 'react-router';
import { Spacer } from '../components/common/Spacer';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Dashboard Page</h2>
      <Spacer height={30} />
      <button onClick={handleLogin}>로그인 페이지로 이동</button>
    </div>
  );
};

export default Dashboard;
