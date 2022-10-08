import React from 'react';
import styles from './styles';
import loginImage from '../../assets/images/login-side-image.jpg';
import registerImage from '../../assets/images/register-side-image.jpg';
import { useRouter } from 'next/router';

interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  const router = useRouter();
  return (
    <styles.LoginWrapper>
      <styles.LeftContent>
        {router.route === '/user/register' ? (
          <styles.LeftContentImage src={registerImage.src} />
        ) : (
          <styles.LeftContentImage src={loginImage.src} />
        )}
      </styles.LeftContent>
      {children}
    </styles.LoginWrapper>
  );
};

export default LoginLayout;
