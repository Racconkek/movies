import "../styles/globals.css";
import React from "react";
import Header from "../components/header/header";
import { getMyInfo } from "../api/user";
import { useEffect } from "react";
import { observer } from "mobx-react";
import GlobalStore from "../mobx/GlobalStore";
import { AppProps } from "next/app";
import styles from './app.module.css';

function MyApp({
  Component,
  pageProps,
  pathname,
}: AppProps & { pathname: string }) {

  async function load() {
    let myInfo;
    try {
      myInfo = (await getMyInfo()).data;
    } catch (e) {
      console.error(e);
    }
    console.log(myInfo);

    if (!myInfo) {
      return;
    }

    // С этого места мы авторизованы

    // const ws = new WebSocket(WSURL);

    // ws.onclose = () => {
    //   console.log("Мы отключились от WS");
    // };
    //
    // ws.onerror = (err) => {
    //   console.log(err);
    // };

    GlobalStore.setAuthorized(true);
    GlobalStore.setAvatar(myInfo.avatar);
    GlobalStore.setFirstName(myInfo.firstName);
    GlobalStore.setSecondName(myInfo.secondName);
    GlobalStore.setId(myInfo.id);
    GlobalStore.setEmail(myInfo.email);
    // GlobalStore.setWs(ws);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className={styles.root}>
      <Header
        pathname={pathname}
        menuItems={
          GlobalStore.authorized
            ? [
              {
                title: `Профиль`,
                url: "/profile",
              },
              {
                title: 'Фильмы',
                url: '/movies'
              },
              { title: "Выйти", url: "/api/user/logout" },
              ]
            : []
        }
        authorized={GlobalStore.authorized}
      />
      <Component {...pageProps} />
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
