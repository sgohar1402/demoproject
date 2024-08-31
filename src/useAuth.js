// src/useAuth.js
import { useState } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('auth', 'true');  // for persisting auth state
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('auth');
  };

  const checkAuth = () => {
    const auth = localStorage.getItem('auth');
    return auth === 'true';
  };

  return { isAuthenticated, login, logout, checkAuth };
};

export default useAuth;
