import React, { type ReactNode, useContext, useState } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = React.createContext<any>(null);

const useAuthService = () => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isAuthorized, setIsAuthorized] = useState();

  const signIn = () => {};

  const signOut = () => {};

  return {
    user,
    isLoading,
    isAuthorized,
  };
};

const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export default useAuth;
