import React from 'react';
import styles from './MoviesSortItem.module.css';
import { observer } from 'mobx-react';
import { IconSortAscending, IconSortDescending } from '@tabler/icons';
import { SortDirection } from '../../mobx/constants';

export interface IMoviesSortItemProps {
  active?: boolean;
  content?: React.ReactNode | string;
  onClick?: () => void;
  sortDirection: SortDirection;
}

export const Component = ({ active, content, onClick, sortDirection }: IMoviesSortItemProps) => {
  return (
    <div className={styles.root} onClick={onClick}>
      {content}
      <div>
        {active ? (
          sortDirection === SortDirection.Asc ? (
            <IconSortAscending className={styles.activeIcon} />
          ) : (
            <IconSortDescending className={styles.activeIcon} />
          )
        ) : (
          <IconSortAscending className={styles.icon} />
        )}
      </div>
    </div>
  );
};

export const MoviesSortItem = observer(Component);
