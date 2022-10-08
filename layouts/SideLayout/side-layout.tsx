import React from 'react';
import styles from './styles';
import loginImage from '../../assets/images/login-side-image.jpg';
import registerImage from '../../assets/images/register-side-image.jpg';
import { useRouter } from 'next/router';
import { type Variants, AnimatePresence } from 'framer-motion';

interface LoginLayoutProps {
  children: React.ReactNode;
}

const variants: Variants = {
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.3,
    },
  },
  hide: {
    x: -150,
    opacity: 0,
  },
};

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  const router = useRouter();
  return (
    <styles.LoginWrapper>
      <AnimatePresence>
        <styles.LeftContent
          variants={variants}
          initial='hide'
          animate='show'
          exit='hide'
        >
          {router.route === '/user/register' ? (
            <styles.LeftContentImage src={registerImage.src} />
          ) : (
            <styles.LeftContentImage src={loginImage.src} />
          )}
        </styles.LeftContent>
      </AnimatePresence>
      {children}
    </styles.LoginWrapper>
  );
};

export default LoginLayout;
