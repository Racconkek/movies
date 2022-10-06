import { Tabs } from 'react-bulma-components';
import GlobalStore from '../mobx/GlobalStore';
import { FilterType } from '../mobx/constants';
import { IconHeart } from '@tabler/icons';
import React from 'react';
import { observer } from 'mobx-react';

const Component = () => {
  return (
    <Tabs type={'boxed'}>
      <Tabs.Tab
        key={'date'}
        active={GlobalStore.moviesFilter === FilterType.All}
        onClick={() => GlobalStore.setFilter(FilterType.All)}
      >
        Все
      </Tabs.Tab>
      <Tabs.Tab
        key={'date'}
        active={GlobalStore.moviesFilter === FilterType.My}
        onClick={() => GlobalStore.setFilter(FilterType.My)}
      >
        Мои
      </Tabs.Tab>
      <Tabs.Tab
        key={'likes'}
        active={GlobalStore.moviesFilter === FilterType.Favourites}
        onClick={() => GlobalStore.setFilter(FilterType.Favourites)}
      >
        <IconHeart color={'#D41818FF'} />
      </Tabs.Tab>
    </Tabs>
  );
};

export const MoviesFilter = observer(Component);
