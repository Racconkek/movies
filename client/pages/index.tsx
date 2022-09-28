import { observer } from "mobx-react";
import Link from "next/link";
import Head from "next/head";
import React, { ReactElement } from "react";
import GlobalStore from "../mobx/GlobalStore";

function HomePage(): ReactElement {
  return (
    <div>
      <Head>
        <title>Главная</title>
      </Head>
      <div >
        Добро пожаловать
      </div>
      {!GlobalStore.authorized &&
        "Для того чтобы использовать его функционал, пожалуйста, войдите через гугл по кнопке в правом верхнем углу."}
      {GlobalStore.authorized && (
          <div>
            Профиль
            <Link href="/profile" passHref>
              <div>
                ({GlobalStore.getFullName})
              </div>
            </Link>
          </div>
      )}
    </div>
  );
}

export default observer(HomePage);
