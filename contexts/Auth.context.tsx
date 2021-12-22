import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface ProviderProps {
  children: React.ReactNode;
}

const AuthContext = React.createContext({
  authToken: '',
  isAuthenticated: false,
  updateAuthToken: (_token: string) => {
    return;
  },
  updateIsAuthenticated: (value: boolean) => {
    return;
  },
});

export const AuthProvider = ({ children }: ProviderProps) => {
  const [authToken, setAuthToken] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.get(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/auth/me`, config);

        if (token) {
          setAuthToken(token);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    fetchUser();
  }, []);

  const updateAuthToken = (token: string) => {
    setAuthToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiry', new Date().toString());
    if (token.trim()) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const updateIsAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
  };

  return (
    <AuthContext.Provider value={{ authToken, updateAuthToken, isAuthenticated, updateIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
