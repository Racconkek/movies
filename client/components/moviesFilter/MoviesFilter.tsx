import GlobalStore from '../../mobx/GlobalStore';
import { FilterType } from '../../mobx/constants';
import { IconHeart } from '@tabler/icons';
import React from 'react';
import { observer } from 'mobx-react';
import styles from './MoviesFilter.module.css';
import { MoviesFilterItem } from './MoviesFilterItem';

const Component = () => {
  return (
    <div className={styles.root}>
      <MoviesFilterItem
        key={'date'}
        caption={'Все'}
        isActive={GlobalStore.moviesFilter === FilterType.All}
        onClick={() => GlobalStore.setFilter(FilterType.All)}
      />
      <MoviesFilterItem
        key={'date'}
        caption={'Мои'}
        isActive={GlobalStore.moviesFilter === FilterType.My}
        onClick={() => GlobalStore.setFilter(FilterType.My)}
      />
      <MoviesFilterItem
        key={'likes'}
        caption={<IconHeart color={'rgba(213,55,55,0.82)'} />}
        isActive={GlobalStore.moviesFilter === FilterType.Favourites}
        onClick={() => GlobalStore.setFilter(FilterType.Favourites)}
      />
    </div>
  );
};

export const MoviesFilter = observer(Component);
