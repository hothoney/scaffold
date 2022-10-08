import React, { useContext } from 'react';
import { type AuthProviderProps, type LoginData } from './types';
import useAuthService from './use-auth-service';

const AuthContext = React.createContext<
  Partial<{
    user: any;
    isAuthorized: boolean;
    signIn: (data: LoginData) => void;
    signOut: () => void;
    isLoginLoading: boolean;
  }>
>({});

const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authContextValues = useAuthService();

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
