import { Movie } from '../../types/movie';
import { Box, Heading, Media, Image as BulmaImage } from 'react-bulma-components';
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
  const imageColor = movie.tags[0]?.color ?? '#FCD99A';

  return (
    <Box className={styles.root}>
      <Media className={styles.inner}>
        <Media.Item className={styles.image}>
          <div className={styles.imageInner} style={{ backgroundColor: imageColor }} />
        </Media.Item>
        <Media.Item className={styles.info}>
          <Media.Item className={styles.header}>
            <Heading style={{ marginBottom: '0', fontSize: 24 }} size={4}>
              {movie.name}
            </Heading>
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
          {shouldRenderDescription && <Media.Item className={styles.description}>{movie.description}</Media.Item>}
          {movie.tags.length > 0 && (
            <Media.Item className={styles.tags}>
              {movie.tags.map((t) => (
                <TagBlock key={t.id} tag={t} />
              ))}
            </Media.Item>
          )}
          <Media.Item className={styles.footer}>
            <Media.Item className={styles.creationInfo}>
              <div className={styles.authorInfo}>
                <BulmaImage size={32} alt="avatar" src={movie.author.avatar} rounded />
                {movie.author.firstName}
              </div>
              <div className={styles.creationDate}>{DateHelper.getFormattedDate(new Date(movie.createdAt))}</div>
            </Media.Item>
            <Media.Item className={styles.editAction}>{canEdit && <EditButton movie={movie} />}</Media.Item>
          </Media.Item>
        </Media.Item>
      </Media>
    </Box>
  );
};

export default observer(MovieBlock);
