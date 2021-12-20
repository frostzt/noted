import React, { useState, useEffect } from 'react';

interface ProviderProps {
  children: React.ReactNode;
}

const AuthContext = React.createContext({
  user: undefined,
  authToken: '',
  updateUser: (_user: any) => {
    return;
  },
  updateAuthToken: (_token: string) => {
    return;
  },
});

export const AuthProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState();
  const [authToken, setAuthToken] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const updateUser = (user: any) => {
    setUser(user);
  };

  const updateAuthToken = (token: string) => {
    setAuthToken(token);
    localStorage.setItem('token', token);
  };

  return <AuthContext.Provider value={{ user, updateUser, authToken, updateAuthToken }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
