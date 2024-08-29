// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  console.log(token)

  const login = (newToken) => {
    // Save the token to local storage
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    setToken('');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
