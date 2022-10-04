import { observer } from 'mobx-react';
import Head from 'next/head';
import React, { ReactElement } from 'react';

function HomePage(): ReactElement {
  return (
    <div>
      <Head>
        <title>Фильмецы</title>
      </Head>
    </div>
  );
}

export default observer(HomePage);
