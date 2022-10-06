import React, { ReactElement } from 'react';
import { observer } from 'mobx-react';
import GlobalStore from '../mobx/GlobalStore';
import Head from 'next/head';
import { Card, Heading, Image, Media } from 'react-bulma-components';

function ProfilePage(): ReactElement {
  return (
    <>
      <Head>
        <title>Профиль</title>
      </Head>
      <Card>
        <Card.Content display={'flex'} flexDirection={'row'}>
          <Media>
            <Media.Item renderAs="figure" align="left">
              <Image size={128} alt="avatar" src={GlobalStore.avatar} rounded />
            </Media.Item>
            <Media.Item>
              <Heading>{GlobalStore.getFullName ?? ''}</Heading>
              <Heading subtitle size={6}>
                {GlobalStore.email ?? ''}
              </Heading>
            </Media.Item>
          </Media>
        </Card.Content>
      </Card>
    </>
  );
}

export default observer(ProfilePage);
