import  React, { useReducer } from "react";
import {appReducer} from "./authReducer";

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {

  const token = JSON.parse(localStorage.getItem("token"));

  const [state, dispatch] = useReducer(appReducer, { isAuthenticated: token === "123" ? true : false });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};