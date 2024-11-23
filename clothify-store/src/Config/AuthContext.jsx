import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const login = async (token, role, userData) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);

    try {
      await axios.get('/customer/checkToken', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsAuthenticated(true);
      setUserData(userData);

      // Navigate based on the user's role
      if (role === 'admin') {
        message.success('Successfully logged in.');
        navigate('/admin');
      } else if (role === 'user') {
        message.success('Successfully logged in.');
        navigate('/profile'); 
      } else {
        message.warning('Unknown role. Please contact support.');
        logout(); 
      }
    } catch (error) {
      setAuthToken('');
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
      message.error('Token verification failed. Please log in again.');
    }
  };

  const logout = () => {
    setAuthToken('');
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUserData(null);
    message.success('You have been logged out.');
    navigate('/login'); 
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isAuthenticated, userData, }}>
      {children}
    </AuthContext.Provider>
  );
};
