import React, { createContext, useContext, useState, useEffect } from 'react';
import { teachers, adminCredentials } from '../data/teachers';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'admin' or 'teacher'

  // Check for existing session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedRole = localStorage.getItem('userRole');
    if (savedUser && savedRole) {
      setUser(JSON.parse(savedUser));
      setUserRole(savedRole);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (role, credentials) => {
    if (role === 'admin') {
      if (credentials.username === adminCredentials.username &&
          credentials.password === adminCredentials.password) {
        const adminUser = { username: 'admin', role: 'admin' };
        setUser(adminUser);
        setUserRole('admin');
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(adminUser));
        localStorage.setItem('userRole', 'admin');
        return { success: true };
      }
    } else if (role === 'teacher') {
      if (teachers[credentials.name] === credentials.password) {
        const teacherUser = { name: credentials.name, role: 'teacher' };
        setUser(teacherUser);
        setUserRole('teacher');
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(teacherUser));
        localStorage.setItem('userRole', 'teacher');
        return { success: true };
      }
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
  };

  const value = {
    user,
    isAuthenticated,
    userRole,
    login,
    logout,
    teachers: Object.keys(teachers)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};