import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const [isTokenChecked, setIsTokenChecked] = useState(false);
 
};

export default ProtectedRoute;