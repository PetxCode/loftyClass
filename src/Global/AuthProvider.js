import React, { createContext, useState, useEffect } from "react";
import { app } from "./../base";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ mgs: "This is the Global State", currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
