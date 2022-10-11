import { observer } from 'mobx-react';
import { Button } from 'react-bulma-components';
import NextJSLink from 'next/link';

const Component = () => {
  return (
    <NextJSLink href="/api/user/oauth/google">
      <Button color={'grey-dark'} colorVariant={'light'} size={'large'} >
        Войдите
      </Button>
    </NextJSLink>
  );
};

export const UnAuthorizedBlock = observer(Component);
