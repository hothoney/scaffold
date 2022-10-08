export enum AuthEnum {
  TokenName = 'token',
}
export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface LoginData {
  passWord: string;
  userName: string;
}
