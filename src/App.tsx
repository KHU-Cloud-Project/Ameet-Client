import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import { Route, Routes } from 'react-router';
import Login from './pages/Login';
import Dashboard from './pages/DashboardPage';
import { BrowserRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import { GlobalStyles } from './styles/GlobalStyles';

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
