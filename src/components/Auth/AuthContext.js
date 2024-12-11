// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Declare states for authentication status and username
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);

  // Initialize state based on cookies when the component mounts
  useEffect(() => {
    const primaryCookie = Cookies.get("primaryCookie");
    const storedUserName = Cookies.get("userName");

    if (primaryCookie && storedUserName) {
      setIsAuthenticated(true);
      setUserName(storedUserName);
    }
  }, []);

  // Login function
  const login = (name) => {
    // Set cookies for user and authentication status
    Cookies.set("primaryCookie", "Driver", { expires: 1 }); // Set common cookie for authentication
    Cookies.set("userName", name, { expires: 1 }); // Set username cookie
    setUserName(name);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    // Remove the cookies and reset state
    Cookies.remove("primaryCookie");
    Cookies.remove("userName");
    setUserName(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth context
export const useAuth = () => useContext(AuthContext);
