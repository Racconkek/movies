import { cx } from '@emotion/css';
import Link from 'next/link';
import React from 'react';
import styles from './MenuItem.module.css';
import ActiveIcon from './activeIcon.svg';
import GlobalStore from '../../../mobx/GlobalStore';

export interface IMenuItemProps {
  href: string;
  title: string | React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export const MenuItem = ({ href, title, isActive, onClick }: IMenuItemProps) => {
  return (
    <Link
      href={href}
      className={cx(
        styles.root,
        GlobalStore.layoutService.isMobile && styles.rootMobile,
        !isActive && styles.nonActiveItem
      )}
      onClick={onClick}
    >
      <>
        {isActive && (
          <div className={styles.icon}>
            <ActiveIcon />
          </div>
        )}
        {title}
      </>
    </Link>
  );
};
