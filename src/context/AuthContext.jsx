import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUserData = localStorage.getItem('userData');

    if (savedToken) {
      setToken(savedToken);
    }
    if (savedUserData) {
      try {
        const parsedUserData = JSON.parse(savedUserData);
        setUserData(parsedUserData);
      } catch (error) {
        console.error('Error parsing userData:', error);
        localStorage.removeItem('userData');
      }
    }
  }, []);

  const login = async ({ accessToken, userId, avatar, nickname }) => {
    setToken(accessToken);
    setUserData({ userId, avatar, nickname });

    localStorage.setItem('token', accessToken);
    localStorage.setItem(
      'userData',
      JSON.stringify({ userId, avatar, nickname })
    );
  };

  const logout = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  };

  const updateProfile = (updatedUserData) => {
    setUserData(updatedUserData);
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
  };

  return (
    <AuthContext.Provider
      value={{ userData, token, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const RequireAuth = ({ children }) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return children;
};
