import React, { ReactElement, useState } from 'react';
import styles from './header.module.css';
import { IconDeviceTv } from '@tabler/icons';
import Link from 'next/link';
import GlobalStore from '../../mobx/GlobalStore';
import { observer } from 'mobx-react';
import { IconMenu2 } from '@tabler/icons';
import { Menu } from './menu/Menu';

function Header(props: { pathname: string; menuItems: Array<{ title: string; url: string }> }): ReactElement {
  const { menuItems = [], pathname } = props;
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleActivity = () => setIsActive(!isActive);

  const renderBurger = () => {
    return <IconMenu2 onClick={handleActivity} />;
  };

  const renderMenu = () => {
    return <Menu menuItems={menuItems} pathname={pathname} onClose={handleActivity} />;
  };

  return (
    <div className={styles.root}>
      <Link href={'/'} key={'main'}>
        <div className={styles.logo}>
          <IconDeviceTv /> Фильмецы
        </div>
      </Link>
      {GlobalStore.layoutService.isDesktop ? <div className={styles.desktopMenu}>{renderMenu()}</div> : renderBurger()}
      {!GlobalStore.layoutService.isDesktop && isActive && renderMenu()}
    </div>
  );
}

export default observer(Header);
