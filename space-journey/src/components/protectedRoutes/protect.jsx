import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token && !isTokenChecked) {
      localStorage.clear();
      toast.warning("An error has occurred");
      setIsTokenChecked(true);
    }
  }, [token, isTokenChecked]);

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;