import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import { Navigate, Route, Routes } from 'react-router';
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
import { MOCK_USER_ID } from './constants/mockUser';
import { teamsAtom } from './recoil/atoms/teamAtom';

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

function AppInitializer() {
  const [user, setUser] = useRecoilState(userAtom);
  const [teams] = useRecoilState(teamsAtom);
  const { fetchUser } = useFetchUser();
  const { fetchTeams } = useFetchTeams(MOCK_USER_ID);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('Using UserId:', MOCK_USER_ID);

        if (!user) {
          const userData = await fetchUser(MOCK_USER_ID);
          setUser(userData);
        }

        if (teams.length === 0) {
          await fetchTeams();
        }
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, [fetchUser, fetchTeams]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!MOCK_USER_ID) {
    return <Navigate to="/login" />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard/:teamId" element={<DashboardPage />} />
        <Route path="/" element={<SpaceboardPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/meeting/:meetingId" element={<MeetingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AppContainer>
          <AppInitializer />
        </AppContainer>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
