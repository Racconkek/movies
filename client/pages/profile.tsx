import React, { ReactElement } from "react";
import { observer } from "mobx-react";
import GlobalStore from "../mobx/GlobalStore";
import Head from "next/head";

function ProfilePage(): ReactElement {

  return (
    <div>
      <Head>
        <title>Мой профиль</title>
      </Head>
      <img
        src={GlobalStore.avatar}
        alt="..."
      />
      <div>
        <h3>{GlobalStore.getFullName}</h3>
        <h6>{GlobalStore.email}</h6>
      </div>
    </div>
  );
}

export default observer(ProfilePage);
