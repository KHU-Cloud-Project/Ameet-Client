import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import { Route, Routes, useNavigate } from 'react-router';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import DashboardPage from './pages/DashboardPage';
import { BrowserRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import { GlobalStyles } from './styles/globalStyles';
import SpaceboardPage from './pages/SpaceboardPage';
import MeetingPage from './pages/MeetingPage';
import { RecoilRoot, useRecoilState } from 'recoil';
import { userAtom } from './recoil/atoms/userAtom';
import { useFetchUser } from './hooks/useFetchUser';
import { useFetchTeams } from './hooks/useFetchTeams';
import { useEffect, useState } from 'react';
import { teamsAtom } from './recoil/atoms/teamAtom';

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

function AppInitializer() {
  // const user = useRecoilValue(userAtom);
  const [user] = useRecoilState(userAtom);
  const [teams] = useRecoilState(teamsAtom);
  const { fetchUser } = useFetchUser();
  const { fetchTeams } = useFetchTeams(user?.id || 0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeApp = async () => {
      console.log('Initializing App...');
      console.log('Current User:', user);

      if (!user?.id) {
        console.warn('User ID is missing. Redirecting to login.');
        setLoading(false);
        navigate('/login');
        return;
      }

      try {
        console.log('Using UserId:', user.id);

        await fetchUser(user.id);

        if (teams.length === 0) {
          console.log('Fetching teams...');
          await fetchTeams();
        }
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, [fetchUser, fetchTeams, user?.id, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/dashboard/:teamId" element={<DashboardPage />} />
      <Route path="/" element={<SpaceboardPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/meeting/:meetingId" element={<MeetingPage />} />
    </Routes>
  );
}

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AppContainer>
          <BrowserRouter>
            <AppInitializer />
          </BrowserRouter>
        </AppContainer>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
