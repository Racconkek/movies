import { Movie } from '../../types/movie';
import { Box, Heading, Media } from 'react-bulma-components';
import { IconHeart } from '@tabler/icons';
import GlobalStore from '../../mobx/GlobalStore';
import { toggleLike } from '../../api/movieApi';
import { observer } from 'mobx-react';
import styles from './MovieBlock.module.css';
import { EditButton } from '../edit/EditButton';

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

  return (
    <Box className={styles.root}>
      <Media className={styles.inner}>
        <Media.Item className={styles.info}>
          <Heading size={3}>{movie.name}</Heading>
          <Heading subtitle>
            {movie.author.firstName} {movie.author.secondName}
          </Heading>
          <Media.Item className={styles.description}>{movie.description}</Media.Item>
        </Media.Item>
        <Media.Item className={styles.actions}>
          <Media.Item>{canEdit && <EditButton movie={movie} />}</Media.Item>
          <Media.Item className={styles.likeAction} onClick={onLikeClick}>
            <IconHeart color={hasLike ? '#D41818FF' : '#000000'} />
            <div
              style={{
                height: '24px',
                display: 'flex',
                width: '24px',
                fontSize: '18px',
                fontWeight: 400,
                lineHeight: 1.25,
                justifyContent: 'center',
              }}
            >
              {movie.usersWhoLike.length}
            </div>
          </Media.Item>
        </Media.Item>
      </Media>
    </Box>
  );
};

export default observer(MovieBlock);
