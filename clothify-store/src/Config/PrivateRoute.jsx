import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext); // Destructure isAuthenticated directly

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
