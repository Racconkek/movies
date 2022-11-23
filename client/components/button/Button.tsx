import { cx } from '@emotion/css';
import React from 'react';
import styles from './Button.module.css';

export type ButtonSize = 'small' | 'medium' | 'large';

export const getButtonSizeStyle = (size?: ButtonSize) => {
  switch (size) {
    case 'small':
      return styles.small;
    case 'medium':
      return styles.medium;
    case 'large':
      return styles.large;
    default:
      return styles.medium;
  }
};

export interface IButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  size?: ButtonSize;
}

export const Button = ({ onClick, children, className, size }: IButtonProps) => {
  const sizeStyles = getButtonSizeStyle(size);

  return (
    <div onClick={onClick} className={cx(styles.root, sizeStyles, className)}>
      {children}
    </div>
  );
};
