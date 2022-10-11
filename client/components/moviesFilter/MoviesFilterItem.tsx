import { cx } from '@emotion/css';
import { observer } from 'mobx-react';
import React from 'react';
import styles from './MoviesFilterItem.module.css';

interface IMoviesFilterItemProps {
  isActive?: boolean;
  caption?: React.ReactNode;
  onClick?: () => void;
}

const Component = ({ isActive, caption, onClick }: IMoviesFilterItemProps) => {
  return (
    <div className={cx(styles.root, isActive && styles.active)} onClick={onClick}>
      {caption}
    </div>
  );
};

export const MoviesFilterItem = observer(Component);
