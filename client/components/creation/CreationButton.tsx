import { MovieCreate } from '../../types/movie';
import { Button } from 'react-bulma-components';
import React, { useState } from 'react';
import { createMovie } from '../../api/movieApi';
import GlobalStore from '../../mobx/GlobalStore';
import MovieModal from '../movie/MovieModal';
import styles from './CreationButton.module.css';

export const CreationButton = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [openedModal, setOpenedModal] = useState<MovieCreate | undefined>(undefined);

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
    <div className={styles.root}>
      <Button color={'grey-dark'} colorVariant={'light'} onClick={onClick} loading={isCreating}>
        Создать
      </Button>
      {openedModal && (
        <MovieModal show={!!openedModal} onClose={() => setOpenedModal(undefined)} onSubmit={createMovieHandler} />
      )}
    </div>
  );
};
