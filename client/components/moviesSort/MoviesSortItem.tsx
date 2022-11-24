import React from 'react';
import styles from './MoviesSortItem.module.css';
import { observer } from 'mobx-react';
import { IconSortAscending, IconSortDescending } from '@tabler/icons';
import { SortDirection } from '../../mobx/constants';
import { cx } from '@emotion/css';

export interface IMoviesSortItemProps {
  active?: boolean;
  content?: React.ReactNode | string;
  onClick?: () => void;
  sortDirection: SortDirection;
}

export const Component = ({ active, content, onClick, sortDirection }: IMoviesSortItemProps) => {
  return (
    <div className={cx(styles.root, active && styles.active)} onClick={onClick}>
      {content}
      <div className={cx(styles.icon, active && styles.activeIcon)}>
        {active ? (
          sortDirection === SortDirection.Asc ? (
            <IconSortAscending />
          ) : (
            <IconSortDescending />
          )
        ) : (
          <IconSortAscending />
        )}
      </div>
    </div>
  );
};

export const MoviesSortItem = observer(Component);
