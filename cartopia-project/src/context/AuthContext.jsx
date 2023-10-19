import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const signIn = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };
  const signOut = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  const value = {
    token,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const UseAuth = () => {
  return useContext(AuthContext);
};
