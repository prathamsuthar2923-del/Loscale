import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import authApi from '../api/auth.api';

const AuthContext = createContext(null);

const TOKEN_KEY = 'loscale_admin_token';
const USERNAME_KEY = 'loscale_admin_username';

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(() => localStorage.getItem(USERNAME_KEY));
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setChecking(false);
      return;
    }
    authApi
      .me()
      .then((res) => setUsername(res.username))
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USERNAME_KEY);
        setUsername(null);
      })
      .finally(() => setChecking(false));
  }, []);

  const login = useCallback(async (user, pass) => {
    const res = await authApi.login(user, pass);
    localStorage.setItem(TOKEN_KEY, res.token);
    localStorage.setItem(USERNAME_KEY, res.username);
    setUsername(res.username);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    setUsername(null);
  }, []);

  return (
    <AuthContext.Provider value={{ username, isAuthenticated: !!username, checking, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
