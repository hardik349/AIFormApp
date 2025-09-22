import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const simulatedLoggedIn = Math.random() > 0.1;
      setIsLoggedIn(simulatedLoggedIn);

      if (simulatedLoggedIn) {
        setUser({ name: 'Hardik', id: '123' });
        setCoupons([
          { id: 'c1', code: 'SAVE 10% OFF', discount: '10% off' },
          { id: 'c2', code: 'FREE DELIVERY', discount: 'Free Shipping' },
        ]);
      } else {
        setUser(null);
        setCoupons([]);
      }
    };
    checkLoginStatus();
  }, []);

  const login = (userData, userCoupons) => {
    setIsLoggedIn(true);
    setUser(userData);
    setCoupons(userCoupons);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCoupons([]);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, coupons, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
