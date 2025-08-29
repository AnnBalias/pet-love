import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Перевіряємо чи є збережений користувач при завантаженні
    const checkCurrentUser = async () => {
      try {
        const currentUser = await api.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to get current user:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkCurrentUser();
  }, []);

  const login = (userData) => {
    api.setUserData(userData);
    setUser(userData);
  };

  const logout = () => {
    api.logout();
    setUser(null);
  };

  const updateUser = (userData) => {
    api.setUserData(userData);
    setUser(userData);
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

