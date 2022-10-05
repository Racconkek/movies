import { Movie } from '../../types/movie';
import { Box, Heading, Media } from 'react-bulma-components';
import { IconHeart } from '@tabler/icons';
import GlobalStore from '../../mobx/GlobalStore';
import { toggleLike } from '../../api/movieApi';
import { observer } from 'mobx-react';

export interface IMovieBlockProps {
  movie: Movie;
}

const MovieBlock = ({ movie }: IMovieBlockProps) => {
  const hasLike = !!movie.usersWhoLike.find((user) => user.id === GlobalStore.id);

  const onClick = async () => {
    const response = await toggleLike(movie.id.toString());
    const modifiedMovie = response.data;
    GlobalStore.deleteMovie(modifiedMovie);
    GlobalStore.addMovie(modifiedMovie);
  };

  return (
    <Box>
      <Media>
        <Media.Item display={'flex'} flexDirection={'column'}>
          <Heading>{movie.name}</Heading>
          <Heading subtitle>
            {movie.author.firstName} {movie.author.secondName}
          </Heading>
          <Media.Item style={{ wordBreak: 'break-word' }}>{movie.description}</Media.Item>
          <Media.Item display={'flex'} justifyContent={'flex-end'} alignItems={'center'} onClick={onClick}>
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
