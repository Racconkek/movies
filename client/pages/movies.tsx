import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { getMovies, getTags } from '../api/movieApi';
import Head from 'next/head';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MovieBlock from '../components/movie/MovieBlock';
import GlobalStore from '../mobx/GlobalStore';
import styles from './movies.module.css';
import { MoviesSort } from '../components/moviesSort/MoviesSort';
import { MoviesFilter } from '../components/moviesFilter/MoviesFilter';

function MoviesPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function load() {
    setIsLoading(true);
    await loadTags();
    await loadMovies();
    setIsLoading(false);
  }

  const loadMovies = async () => {
    try {
      const response = await getMovies();

      if (!response.data) {
        return;
      }

      GlobalStore.setMovies(response.data);
    } catch (e) {
      console.log('Ошибка загрузки фильмов', e);
    }
  };

  const loadTags = async () => {
    try {
      const response = await getTags();

      if (!response.data) {
        return;
      }

      GlobalStore.setTags(response.data);
    } catch (e) {
      console.log('Ошибка загрузки фильмов', e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Head>
        <title>Фильмецы</title>
      </Head>
      <div className={styles.root}>
        <div key={'contentBlock'} className={styles.contentBlock}>
          <div key={'filterBlock'} className={styles.filterBlock}>
            <MoviesFilter />
          </div>
          <div key={'listBlock'} className={styles.listBlock}>
            <PerfectScrollbar className={styles.scrollBar}>
              {isLoading ? 'Загрузка' : GlobalStore.movies.map((m) => <MovieBlock key={m.id} movie={m} />)}
            </PerfectScrollbar>
          </div>
        </div>
        <div key={'sortBlock'} className={styles.sortBlock}>
          <MoviesSort />
        </div>
      </div>
    </>
  );
}

export default observer(MoviesPage);
