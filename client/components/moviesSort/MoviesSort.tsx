import { observer } from 'mobx-react';
import { MoviesSortItem } from './MoviesSortItem';
import GlobalStore from '../../mobx/GlobalStore';
import { SortType } from '../../mobx/constants';
import React from 'react';
import styles from './MoviesSort.module.css';
import { getDirection } from '../../mobx/helpers';

const Component = () => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>Сортировать по</div>
      <div style={{ marginLeft: '-12px' }}>
        <MoviesSortItem
          active={GlobalStore.moviesSort.type === SortType.CreatedAt}
          onClick={() =>
            GlobalStore.setSort({
              type: SortType.CreatedAt,
              direction: getDirection(GlobalStore.moviesSort, SortType.CreatedAt),
            })
          }
          content={'Дате создания'}
          sortDirection={GlobalStore.moviesSort.direction}
        />
        <MoviesSortItem
          active={GlobalStore.moviesSort.type === SortType.Likes}
          onClick={() =>
            GlobalStore.setSort({
              type: SortType.Likes,
              direction: getDirection(GlobalStore.moviesSort, SortType.Likes),
            })
          }
          content={'Количеству лайков'}
          sortDirection={GlobalStore.moviesSort.direction}
        />
      </div>
    </div>
  );
};
export const MoviesSort = observer(Component);
