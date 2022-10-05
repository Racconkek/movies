import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { createMovie, getMovies } from '../api/movieApi';
import { Block, Button, Container } from 'react-bulma-components';
import Head from 'next/head';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MovieBlock from '../components/movie/MovieBlock';
import GlobalStore from '../mobx/GlobalStore';
import MovieModal from '../components/movie/MovieModal';
import { MovieCreate } from '../types/movie';

function MoviesPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [openedModal, setOpenedModal] = useState<MovieCreate | undefined>(undefined);

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

  const onClick = async () => {
    const newMovie: MovieCreate = {
      name: 'Новый фильм',
      description: 'Описание нового фильма',
    };
    setOpenedModal(newMovie);
  };

  const createMovieHandler = async (payload: MovieCreate) => {
    setIsCreating(true);
    try {
      const response = await createMovie(payload.name, payload.description);
      if (!response.data) {
        console.log('Ошибка при создании фильма');
        return;
      }
      GlobalStore.addMovie(response.data);
    } catch (e) {
      console.log('Ошибка при создании фильма');
    }
    setIsCreating(false);
  };

  return (
    <>
      <Head>
        <title>Фильмецы</title>
      </Head>
      <Container
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-around'}
        style={{ width: '100%', height: '100%' }}
      >
        <Block style={{ height: '10%', padding: '16px' }}>
          <Button size={'medium'} color={'info'} onClick={onClick} fullwidth={false} loading={isCreating}>
            Создать
          </Button>
        </Block>
        <Block style={{ height: '90%' }}>
          <PerfectScrollbar style={{ height: '100%', padding: '16px' }}>
            {isLoading ? 'Загрузка' : GlobalStore.movies.map((m) => <MovieBlock key={m.id} movie={m} />)}
          </PerfectScrollbar>
        </Block>
      </Container>
      {openedModal && (
        <MovieModal show={!!openedModal} onClose={() => setOpenedModal(undefined)} onSubmit={createMovieHandler} />
      )}
    </>
  );
}

export default observer(MoviesPage);
