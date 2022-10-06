import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { getMovies } from '../api/movieApi';
import { Block } from 'react-bulma-components';
import Head from 'next/head';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MovieBlock from '../components/movie/MovieBlock';
import GlobalStore from '../mobx/GlobalStore';
import { MoviesFilter } from '../components/MoviesFilter';
import styles from './movies.module.css';
import { MoviesSort } from '../components/moviesSort/MoviesSort';

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

  return (
    <>
      <Head>
        <title>Фильмецы</title>
      </Head>
      <div className={styles.root}>
        <Block className={styles.sortBlock}>
          <MoviesSort />
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
