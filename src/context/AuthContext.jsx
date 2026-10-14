import { createContext, useContext, useEffect, useState } from 'react';
import { getMe, refreshToken } from '../features/auth/services/auth.service';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [authReady, setAuthReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let active = true;
    const checkAuth = async () => {
      try {
        await refreshToken();
        const currentUser = await getMe();
        if (active) {
          setIsAuthenticated(true);
          setUser(currentUser);
        }
      } catch {
        if (active) {
          setIsAuthenticated(false);
          setUser(null);
        }
      } finally {
        if (active) {
          setAuthReady(true);
        }
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authReady, isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
