import React from "react";

export interface AuthContextModel {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextModel | null>(null);

export default AuthContext;
