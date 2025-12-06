// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Make sure this path is correct

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // If there is no user, redirect to the /login page
    alert("Please log in to continue."); // Optional: You can still show an alert
    return <Navigate to="/login" />;
  }

  // If there is a user, render the child component (the page you want to protect)
  return children;
};

export default ProtectedRoute;