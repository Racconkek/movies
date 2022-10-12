import { Movie, MovieCreate } from '../../types/movie';
import React, { useState } from 'react';
import { updateMovie } from '../../api/movieApi';
import GlobalStore from '../../mobx/GlobalStore';
import MovieModal from '../movie/MovieModal';
import styles from './EditButton.module.css';
import { Button } from 'react-bulma-components';

export interface IEditButtonProps {
  movie: Movie;
}

export const EditButton = ({ movie }: IEditButtonProps) => {
  const [openedModal, setOpenedModal] = useState<MovieCreate | undefined>(undefined);

  const onClick = async () => {
    const newMovie: MovieCreate = {
      name: movie.name,
      description: movie.description,
    };
    setOpenedModal(newMovie);
  };

  const updateMovieHandler = async (payload: MovieCreate) => {
    try {
      const response = await updateMovie(movie.id, payload.name, payload.description);
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
    <Button className={styles.root} onClick={onClick}>
      <div>Редактировать</div>
      {openedModal && (
        <MovieModal
          show={!!openedModal}
          onClose={() => setOpenedModal(undefined)}
          onSubmit={updateMovieHandler}
          name={movie.name}
          description={movie.description}
          submitText={'Сохранить'}
        />
      )}
    </Button>
  );
};
