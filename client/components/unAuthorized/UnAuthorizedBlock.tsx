import { observer } from 'mobx-react';
import Link from 'next/link';
import { Button } from '../button/Button';

const Component = () => {
  return (
    <Link href="/api/user/oauth/google" passHref>
      <Button size={'large'}>Войдите</Button>
    </Link>
  );
};

export const UnAuthorizedBlock = observer(Component);
