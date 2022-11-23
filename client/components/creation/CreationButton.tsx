import { MovieCreate } from '../../types/movie';

import React, { useState } from 'react';
import { createMovie } from '../../api/movieApi';
import GlobalStore from '../../mobx/GlobalStore';
import MovieModal from '../movie/MovieModal';
import { Button, IButtonProps } from "../button/Button";

export const CreationButton = (props: IButtonProps) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  const onClick = () => {
    setIsOpenedModal(true);
  };

  const onClose = () => {
    setIsOpenedModal(false);
  };

  const createMovieHandler = async (payload: MovieCreate) => {
    setIsCreating(true);
    try {
      const response = await createMovie(payload.name, payload.description, payload.tags);
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
    <div>
      <Button onClick={onClick} isLoading={isCreating} {...props}>
        Создать
      </Button>
      {isOpenedModal && <MovieModal show={!!isOpenedModal} onClose={onClose} onSubmit={createMovieHandler} />}
    </div>
  );
};
