import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

// Create the context
const AuthContext = createContext(null);

// This is the provider component that will wrap your entire application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // This effect runs once when the app starts up
  useEffect(() => {
    // Check if a token exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        // Check if the token is expired
        const isExpired = decodedUser.exp * 1000 < Date.now();
        if (!isExpired) {
          // If token is valid, set the user state
          setUser(decodedUser);
        } else {
          // If token is expired, remove it
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error("Error decoding token on initial load:", error);
        localStorage.removeItem('token');
      }
    }
  }, []); // The empty array [] means this effect only runs once

  // This is the function the Login component will call
  const login = (token) => {
    // 1. Save the token to the browser's local storage
    localStorage.setItem('token', token);
    // 2. Decode the token to get the user's payload (name, email, role, etc.)
    const decodedUser = jwtDecode(token);
    // 3. Set the user in the global state
    setUser(decodedUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Provide the user object and the login/logout functions to the rest of the app
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// This is the custom hook that your components will use to access the context
export const useAuth = () => {
  return useContext(AuthContext);
};

