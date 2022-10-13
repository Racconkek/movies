import { Movie, MovieCreate } from '../../types/movie';
import React, { useState } from 'react';
import { updateMovie } from '../../api/movieApi';
import GlobalStore from '../../mobx/GlobalStore';
import MovieModal from '../movie/MovieModal';
import styles from './EditButton.module.css';
import { Button } from 'react-bulma-components';
import { IconPencil } from "@tabler/icons";

export interface IEditButtonProps {
  movie: Movie;
}

export const EditButton = ({ movie }: IEditButtonProps) => {
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  const onOpen = () => setIsOpenedModal(true);

  const onClose = () => setIsOpenedModal(false);

  const updateMovieHandler = async (payload: MovieCreate) => {
    try {
      const response = await updateMovie(movie.id, payload.name, payload.description, payload.tags);
      if (!response.data) {
        console.log('Ошибка при обновлении фильма');
        return;
      }
      GlobalStore.updateMovie(response.data);
    } catch (e) {
      console.log('Ошибка при обновлении фильма');
    }
  };

  return (
    <>
      <Button className={styles.root} onClick={onOpen}>
        <IconPencil />
      </Button>
      {isOpenedModal && (
        <MovieModal
          show={!!isOpenedModal}
          onClose={onClose}
          onSubmit={updateMovieHandler}
          name={movie.name}
          description={movie.description}
          tags={movie.tags}
          submitText={'Сохранить'}
        />
      )}
    </>
  );
};
