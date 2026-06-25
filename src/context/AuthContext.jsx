import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const currentUserStr = localStorage.getItem('popx_current_user');
    if (currentUserStr) {
      try {
        setUser(JSON.parse(currentUserStr));
      } catch (e) {
        console.error('Error parsing stored user', e);
        localStorage.removeItem('popx_current_user');
      }
    }
    setLoading(false);
  }, []);

  const signup = (userData) => {
    // Save to users list
    const usersStr = localStorage.getItem('popx_users') || '[]';
    let users = [];
    try {
      users = JSON.parse(usersStr);
    } catch (e) {
      users = [];
    }

    // Check if user already exists
    const exists = users.some((u) => u.email === userData.email);
    if (exists) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = { ...userData, id: Date.now().toString() };
    users.push(newUser);
    localStorage.setItem('popx_users', JSON.stringify(users));

    // Log the user in immediately
    localStorage.setItem('popx_current_user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const login = (email, password) => {
    const usersStr = localStorage.getItem('popx_users') || '[]';
    let users = [];
    try {
      users = JSON.parse(usersStr);
    } catch (e) {
      users = [];
    }

    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!foundUser) {
      throw new Error('Invalid email or password.');
    }

    localStorage.setItem('popx_current_user', JSON.stringify(foundUser));
    setUser(foundUser);
    return foundUser;
  };

  const logout = () => {
    localStorage.removeItem('popx_current_user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
