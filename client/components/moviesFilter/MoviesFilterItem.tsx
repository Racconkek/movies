import { cx } from '@emotion/css';
import { observer } from 'mobx-react';
import React from 'react';
import styles from './MoviesFilterItem.module.css';
import ActiveIcon from './ActiveIconH.svg';

interface IMoviesFilterItemProps {
  isActive?: boolean;
  caption?: React.ReactNode;
  onClick?: () => void;
}

const Component = ({ isActive, caption, onClick }: IMoviesFilterItemProps) => {
  return (
    <div className={cx(styles.root, isActive && styles.active)} onClick={onClick}>
      <div className={styles.caption}>{caption}</div>
      {isActive && (
        <div className={styles.icon}>
          <ActiveIcon />
        </div>
      )}
    </div>
  );
};

export const MoviesFilterItem = observer(Component);
