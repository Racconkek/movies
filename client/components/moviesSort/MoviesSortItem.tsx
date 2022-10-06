import React from 'react';
import { cx } from '@emotion/css';
import styles from './MoviesSortItem.module.css';
import { observer } from 'mobx-react';

export interface IMoviesSortItemProps {
  active?: boolean;
  content?: React.ReactNode | string;
  onClick?: () => void;
}

export const Component = ({ active, content, onClick }: IMoviesSortItemProps) => {
  return (
    <div className={cx(styles.root, active && styles.active)} onClick={onClick}>
      {content}
    </div>
  );
};

export const MoviesSortItem = observer(Component);
