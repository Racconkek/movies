import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { getMovies } from '../api/movieApi';
import { Block, Menu } from 'react-bulma-components';
import Head from 'next/head';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MovieBlock from '../components/movie/MovieBlock';
import GlobalStore from '../mobx/GlobalStore';
import { MoviesFilter } from '../components/MoviesFilter';
import styles from './movies.module.css';
import { SortType } from '../mobx/constants';
import { MoviesSortItem } from '../components/moviesSort/MoviesSortItem';

function MoviesPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function load() {
    try {
      setIsLoading(true);
      const response = await getMovies();

      if (!response.data) {
        return;
      }

      GlobalStore.setMovies(response.data);
      setIsLoading(false);
    } catch (e) {
      console.log('Ошибка загрузки фильмов', e);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const changeToCreatedAt = () => {
    GlobalStore.setSort(SortType.CreatedAt);
  };

  return (
    <>
      <Head>
        <title>Фильмецы</title>
      </Head>
      <div className={styles.root}>
        <Block style={{ width: '10%' }}>
          <Menu>
            <Menu.List title={'Сортировать по'}>
              <div style={{ marginLeft: '-12px' }}>
                <MoviesSortItem
                  active={GlobalStore.moviesSort === SortType.CreatedAt}
                  onClick={changeToCreatedAt}
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
        </Block>
        <Block style={{ width: '90%' }}>
          <Block style={{ padding: '0 16px' }}>
            <MoviesFilter />
          </Block>
          <Block style={{ height: '90%' }}>
            <PerfectScrollbar style={{ padding: '16px' }}>
              {isLoading ? 'Загрузка' : GlobalStore.movies.map((m) => <MovieBlock key={m.id} movie={m} />)}
            </PerfectScrollbar>
          </Block>
        </Block>
      </div>
    </>
  );
}

export default observer(MoviesPage);
