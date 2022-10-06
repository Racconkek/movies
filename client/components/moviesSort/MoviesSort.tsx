import { observer } from 'mobx-react';
import { Menu } from 'react-bulma-components';
import { MoviesSortItem } from './MoviesSortItem';
import GlobalStore from '../../mobx/GlobalStore';
import { SortType } from '../../mobx/constants';
import React from 'react';
import styles from './MoviesSort.module.css';
import { getDirection } from '../../mobx/helpers';

const Component = () => {
  return (
    <Menu className={styles.root}>
      <Menu.List title={'Сортировать по'}>
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
      </Menu.List>
    </Menu>
  );
};
export const MoviesSort = observer(Component);
