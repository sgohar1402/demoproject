// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';

const ProtectedRoute = ({ element }) => {
  const auth = useAuth();

  if (!auth.checkAuth()) {
    return <Navigate to="/" />;  // Redirect to login page if not authenticated
  }

  return element;
};

export default ProtectedRoute;
