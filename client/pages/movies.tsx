import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Movie } from '../types/movie';
import { createMovie, getMovies } from '../api/movieApi';
import { Block, Box, Button, Container } from 'react-bulma-components';
import Head from 'next/head';
import PerfectScrollbar from 'react-perfect-scrollbar';

function MoviesPage() {
  const [movies, setMovies] = useState<undefined | Movie[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  async function load() {
    try {
      setIsLoading(true);
      const response = await getMovies();

      if (!response.data) {
        return;
      }

      setMovies(response.data);
      setIsLoading(false);
    } catch (e) {
      console.log('Ошибка загрузки фильмов', e);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const onClick = async () => {
    try {
      const response = await createMovie('Новый фильм', 'Описание нового фильма');
      if (!response.data) {
        return;
        console.log('Ошибка при создании фильма');
      }
      setMovies([...movies, response.data]);
    } catch (e) {
      console.log('Ошибка при создании фильма');
    }
  };

  return (
    <>
      <Head>
        <title>Фильмецы</title>
      </Head>
      <Container style={{ width: '100%' }}>
        <Block>
          <Button size={'medium'} color={'info'} onClick={onClick} fullwidth={false}>
            Создать
          </Button>
        </Block>
        <PerfectScrollbar style={{ height: '80%' }}>
          {isLoading ? 'Загрузка' : movies.map((m) => <Box>{m.name}</Box>)}
        </PerfectScrollbar>
      </Container>
    </>
  );
}

export default observer(MoviesPage);
