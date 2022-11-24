import { Movie } from '../../types/movie';
import { Heading, Image as BulmaImage } from 'react-bulma-components';
import { IconHeart } from '@tabler/icons';
import GlobalStore from '../../mobx/GlobalStore';
import { toggleLike } from '../../api/movieApi';
import { observer } from 'mobx-react';
import styles from './MovieBlock.module.css';
import { EditButton } from '../edit/EditButton';
import { DateHelper } from '../../helpers/DateHelper';
import React from 'react';
import { TagBlock } from './TagBlock';

export interface IMovieBlockProps {
  movie: Movie;
}

const MovieBlock = ({ movie }: IMovieBlockProps) => {
  const hasLike = !!movie.usersWhoLike.find((user) => user.id === GlobalStore.id);
  const canEdit = GlobalStore.id === movie.authorId;

  const onLikeClick = async () => {
    const hasLike = !!movie.usersWhoLike.find((u) => u.id === GlobalStore.id);
    if (hasLike) {
      movie.usersWhoLike = movie.usersWhoLike.filter((u) => u.id !== GlobalStore.id);
    } else {
      movie.usersWhoLike.push(GlobalStore.currentUser);
    }
    GlobalStore.updateMovie(movie);
    toggleLike(movie.id.toString())
      .then((response) => GlobalStore.updateMovie(response.data))
      .catch(console.log);
  };

  const shouldRenderDescription = movie.description !== '' || (movie.description === '' && movie.tags.length === 0);
  // const imageColor = movie.tags[0]?.color ?? '#FCD99A';

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Heading style={{ marginBottom: '0', fontSize: 24 }} size={4}>
          {movie.name}
        </Heading>
        <div className={styles.likeAction} onClick={onLikeClick}>
          <IconHeart color={hasLike ? 'rgba(213,55,55,0.82)' : '#4a4a4a'} />
          <div className={styles.likeCount}>{movie.usersWhoLike.length}</div>
        </div>
      </div>
      {shouldRenderDescription && <div className={styles.description}>{movie.description}</div>}
      {movie.tags.length > 0 && (
        <div className={styles.tags}>
          {movie.tags.map((t) => (
            <TagBlock key={t.id} tag={t} />
          ))}
        </div>
      )}
      <div className={styles.footer}>
        <div className={styles.creationInfo}>
          <BulmaImage size={32} alt="avatar" src={movie.author.avatar} rounded />
          <div className={styles.authorInfo}>
            <div>{movie.author.firstName}</div>
            <div className={styles.creationDate}>{DateHelper.getFormattedDate(new Date(movie.createdAt))}</div>
          </div>
        </div>
        <div className={styles.editAction}>{canEdit && <EditButton movie={movie} />}</div>
      </div>
    </div>
  );
};

export default observer(MovieBlock);
