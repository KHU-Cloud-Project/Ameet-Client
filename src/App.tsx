import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/globalStyles';
import { Route, Routes } from 'react-router';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { BrowserRouter } from 'react-router-dom';

// 스타일 정의
function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
