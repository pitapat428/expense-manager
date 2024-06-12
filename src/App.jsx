import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Login from './components/Login';
import Profile from './components/Profile';
import Layout from './components/Layout';
import { AuthProvider, RequireAuth } from './context/AuthContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
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
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
