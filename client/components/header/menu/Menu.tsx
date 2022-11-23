import styles from './Menu.module.css';
import { cx } from '@emotion/css';
import React from 'react';
import GlobalStore from '../../../mobx/GlobalStore';
import { MenuItem } from './MenuItem';
import { CreationButton } from '../../creation/CreationButton';
import { observer } from 'mobx-react';
import { MenuItemButton } from './MenuItemButton';
import Link from 'next/link';

export interface ISubMenuProps {
  pathname: string;
  menuItems: Array<{ title: string; url: string }>;
  onClose: () => void;
}

export const Menu = ({ menuItems, pathname, onClose }: ISubMenuProps) => {
  const menuStyles = GlobalStore.layoutService.isMobile ? styles.mobileMenu : styles.menu;
  const authorized = GlobalStore.authorized;
  const closeMenu = GlobalStore.layoutService.isMobile ? onClose : undefined;

  return (
    <div className={menuStyles}>
      <div className={styles.auth}>{authorized && GlobalStore.getFullName}</div>
      <div className={cx(styles.subMenu)}>
        {menuItems.map((section) => (
          <MenuItem
            href={section.url}
            key={section.title}
            title={section.title}
            isActive={section.url === pathname}
            onClick={closeMenu}
          />
        ))}
      </div>
      <div className={cx(styles.subMenu, styles.menuRight)}>
        {authorized && (
          <MenuItemButton>
            <CreationButton size={'small'} />
          </MenuItemButton>
        )}
        {authorized && (
          <MenuItemButton>
            <Link href={'/api/user/logout'}>Выйти</Link>
          </MenuItemButton>
        )}
      </div>
    </div>
  );
};

export default observer(Menu);
