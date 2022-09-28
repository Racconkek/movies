import React, { ReactElement } from "react";
import Head from "next/head";

export default function GoogleAuthFailedPage(): ReactElement {
  return (
    <div>
      <Head>
        <title>Ошибка аутентификации - VideoHosting</title>
      </Head>
      В процессе аутентификации произошла ошибка
    </div>
  );
}
