import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUserData = localStorage.getItem('userData');

    if (savedToken && savedUserData) {
      setToken(savedToken);
      try {
        setUserData(JSON.parse(savedUserData));
      } catch (error) {
        console.error('Error parsing userData:', error);
      }
    }
  }, []);

  const login = async (formData) => {
    try {
      const response = await axios.post(
        'https://moneyfulpublicpolicy.co.kr/login',
        formData
      );
      const { accessToken, userId, avatar, nickname } = response.data;

      setToken(accessToken);
      setUserData({ userId, avatar, nickname });

      localStorage.setItem('token', accessToken);
      localStorage.setItem(
        'userData',
        JSON.stringify({ userId, avatar, nickname })
      );
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  };

  return (
    <AuthContext.Provider value={{ userData, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
