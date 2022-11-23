import 'bulma/css/bulma.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/globals.css';
import React, { useEffect } from 'react';
import Header from '../components/header/header';
import { observer } from 'mobx-react';
import GlobalStore from '../mobx/GlobalStore';
import { AppProps } from 'next/app';
import styles from './app.module.css';

function MyApp({ Component, pageProps, pathname }: AppProps & { pathname: string }) {
  useEffect(() => {
    GlobalStore.start();
    return function cleanup() {
      GlobalStore.stop();
    };
  }, []);

  return (
    <main className={styles.root}>
      {GlobalStore.authorized && (
        <Header
          pathname={pathname}
          menuItems={
            GlobalStore.authorized
              ? [
                  {
                    title: 'Фильмы',
                    url: '/movies',
                  },
                  {
                    title: `Профиль`,
                    url: '/profile',
                  },
                ]
              : []
          }
        />
      )}
      <div className={styles.container}>
        <Component {...pageProps} />
      </div>
    </main>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { pathname } = ctx;

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps, pathname };
};

export default observer(MyApp);
