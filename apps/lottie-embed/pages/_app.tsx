import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Welcome to lottie-embed!</title>
      </Head>
      <div className='app'>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  );
}

export default CustomApp;
