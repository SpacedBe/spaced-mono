import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { Button } from '@spaced/ui';
import { ChakraProvider } from '@chakra-ui/react';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <title>Welcome to check-in!</title>
      </Head>
      <div className="app">
        <main>
          <Component {...pageProps} />
        </main>
        <Button content={'hello'} disabled={false} />
      </div>
    </ChakraProvider>
  );
}

export default CustomApp;
