import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Login from './components/Login';
import Profile from './components/Profile';
import Layout from './components/Layout';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

const queryClient = new QueryClient();

const RequireAuth = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <RequireAuth>
          <Layout>
            <Home />
          </Layout>
        </RequireAuth>
      }
    />
    <Route
      path="/detail/:id"
      element={
        <RequireAuth>
          <Layout>
            <Detail />
          </Layout>
        </RequireAuth>
      }
    />
    <Route path="/login" element={<Login />} />
    <Route
      path="/profile"
      element={
        <RequireAuth>
          <Layout>
            <Profile />
          </Layout>
        </RequireAuth>
      }
    />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
