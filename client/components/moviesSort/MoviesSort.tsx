import { observer } from 'mobx-react';
import { Menu } from 'react-bulma-components';
import { MoviesSortItem } from './MoviesSortItem';
import GlobalStore from '../../mobx/GlobalStore';
import { SortType } from '../../mobx/constants';
import React from 'react';
import styles from './MoviesSort.module.css';

const Component = () => {
  return (
    <Menu className={styles.root}>
      <Menu.List title={'Сортировать по'}>
        <div style={{ marginLeft: '-12px' }}>
          <MoviesSortItem
            active={GlobalStore.moviesSort === SortType.CreatedAt}
            onClick={() => GlobalStore.setSort(SortType.CreatedAt)}
            content={'Дате создания'}
          />
          <MoviesSortItem
            active={GlobalStore.moviesSort === SortType.Likes}
            onClick={() => GlobalStore.setSort(SortType.Likes)}
            content={'Количеству лайков'}
          />
        </div>
      </Menu.List>
    </Menu>
  );
};
export const MoviesSort = observer(Component);
