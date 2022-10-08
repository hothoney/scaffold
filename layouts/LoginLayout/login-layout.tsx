import React from 'react';
import styles from './styles';
import catImage from '../../assets/images/login-side-image.jpg';

interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <styles.LoginWrapper>
      <styles.LeftContent>
        <styles.LeftContentImage src={catImage.src} />
      </styles.LeftContent>
      {children}
    </styles.LoginWrapper>
  );
};

export default LoginLayout;
