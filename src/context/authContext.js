import {appReducer} from "./authReducer";
import  React, { useReducer } from "react";

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  // khởi tạo
  const [state, dispatch] = useReducer(appReducer, {isAuthenticated: false});
  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};