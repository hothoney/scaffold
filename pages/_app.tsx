import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../hooks/useAuth';
import DefaultLayout from '../layouts/DefaultLayout';
import '@arco-design/web-react/dist/css/arco.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </AuthProvider>
  );
}

export default MyApp;
