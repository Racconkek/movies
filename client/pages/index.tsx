import { observer } from 'mobx-react';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import GlobalStore from '../mobx/GlobalStore';
import { UnAuthorizedBlock } from '../components/unAuthorized/UnAuthorizedBlock';

function HomePage(): ReactElement {
  return (
    <>
      <Head>
        <title>Фильмецы</title>
      </Head>
      {!GlobalStore.authorized && <UnAuthorizedBlock />}
    </>
  );
}

export default observer(HomePage);
