import React, { ReactElement, useState } from 'react';
import Head from 'next/head';
import { Form, Button } from 'react-bulma-components';
import GlobalStore from '../mobx/GlobalStore';
import { observer } from 'mobx-react';
import { searchKinopoiskMoviesByName } from '../api/kinopoistApi';

function SearchPage(): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>('');

  const loadMoviesPage = async () => {
    if (query.length < 3) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await searchKinopoiskMoviesByName({ query: query, page: 1, limit: 10 });

      if (!response.data) {
        return;
      }

      GlobalStore.addSearchPage(response.data);
      setIsLoading(false);
    } catch (e) {
      console.log('Ошибка поиска фильмов', e);
    }
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    if (value && value.length < 255) {
      setQuery(value);
    }
  };

  return (
    <>
      <Head>
        <title>Поиск фильмов</title>
      </Head>
      <div>
        <Form.Input placeholder="Введите название фильма" type="text" value={query} onChange={onNameChange} />
        <Button color={'grey-dark'} onClick={() => loadMoviesPage()}>
          Поиск
        </Button>
        {isLoading
          ? 'Загрузка'
          : GlobalStore.searchPages.map((page) => page.docs.map((movie) => `${movie.id} - ${movie.name}`))}
      </div>
    </>
  );
}

export default observer(SearchPage);
