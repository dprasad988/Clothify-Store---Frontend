import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);
  const navigate = useNavigate();

  const login = async (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);

    try {
      await axios.get('/customer/checkToken', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsAuthenticated(true);
      message.success('Successfully logged in.');
      navigate('/profile'); 
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
    message.success('You have been logged out.');
    navigate('/login'); 
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
