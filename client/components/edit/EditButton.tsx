import { Movie, MovieCreate } from '../../types/movie';
import React, { useState } from 'react';
import { updateMovie } from '../../api/movieApi';
import GlobalStore from '../../mobx/GlobalStore';
import MovieModal from '../movie/MovieModal';
import { IconPencil } from '@tabler/icons';
import styles from './EditButton.module.css';

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
    <div className={styles.root}>
      <IconPencil onClick={onClick} />
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
    </div>
  );
};
