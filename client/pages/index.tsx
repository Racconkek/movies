import { observer } from 'mobx-react';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import { getMovies } from '../api/movieApi';
import GlobalStore from '../mobx/GlobalStore';
import styles from './movies.module.css';
import { Block } from 'react-bulma-components';
import { MoviesSort } from '../components/moviesSort/MoviesSort';
import { MoviesFilter } from '../components/MoviesFilter';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MovieBlock from '../components/movie/MovieBlock';

function HomePage(): ReactElement {
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
        <Block key={'sortBlock'} className={styles.sortBlock}>
          <MoviesSort />
        </Block>
        <Block key={'contentBlock'} className={styles.contentBlock}>
          <Block key={'filterBlock'} className={styles.filterBlock}>
            <MoviesFilter />
          </Block>
          <Block key={'listBlock'} className={styles.listBlock}>
            <PerfectScrollbar className={styles.scrollBar}>
              {isLoading ? 'Загрузка' : GlobalStore.movies.map((m) => <MovieBlock key={m.id} movie={m} />)}
            </PerfectScrollbar>
          </Block>
        </Block>
      </div>
    </>
  );
}

export default observer(HomePage);
