import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../hooks/useAuth';
import DefaultLayout from '../layouts/DefaultLayout';
import '@arco-design/web-react/dist/css/arco.css';
import { useRouter } from 'next/router';
import LoginLayout from '../layouts/LoginLayout';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.route === '/user/login' || router.route === '/user/register') {
    return (
      <AuthProvider>
        <LoginLayout>
          <Component {...pageProps} />
        </LoginLayout>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </AuthProvider>
  );
}

export default MyApp;
