import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [user, setUser] = useState(null); // You might want to store user details here

  // In a real app, you would check for a stored token or session here
  useEffect(() => {
    // For demonstration, let's simulate a login
    const checkLoginStatus = async () => {
      // e.g., await AsyncStorage.getItem('userToken');
      const simulatedLoggedIn = Math.random() > 0.5; // Simulate logged in or not
      setIsLoggedIn(simulatedLoggedIn);

      if (simulatedLoggedIn) {
        setUser({ name: 'Hardik', id: '123' });
        setCoupons([
          { id: 'c1', code: 'SAVE10', discount: '10% off' },
          { id: 'c2', code: 'FREESHIP', discount: 'Free Shipping' },
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
    // In a real app, you would clear stored tokens/sessions here
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, coupons, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
