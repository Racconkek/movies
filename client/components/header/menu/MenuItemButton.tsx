import React from 'react';
import styles from './MenuItemButton.module.css';

export interface IMenuItemButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

export const MenuItemButton = ({ onClick, children }: IMenuItemButtonProps) => {
  return (
    <div className={styles.root} onClick={onClick}>
      {children}
    </div>
  );
};
