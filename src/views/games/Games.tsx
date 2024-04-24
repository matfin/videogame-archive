import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import type { AppDispatch, RootState } from '@state/store';
import { fetchGames, setFilter } from '@state/search/searchSlice';
import { Filter, PlatformOption, Game } from '@models';
import { filterFromSearchParams, updateSearchParams } from '@utils/filters';
import InputText from '@components/InputText';
import InputSelect from '@components/InputSelect';
import VideoGame from '@components/Game';
import { Container, Header, Results, NoResultsHeading } from './Games.style';

export interface Props {
  filter: Filter;
  games: Game[];
  platformOptions: PlatformOption[];
  onFilterChange: (filter: Filter) => void;
}

type FilterInputEvent =
  | React.FormEvent<HTMLSelectElement>
  | React.FormEvent<HTMLInputElement>;

export const Games = ({
  filter,
  games,
  platformOptions,
  onFilterChange,
}: Props): React.ReactElement => {
  const handleInputChange = useCallback(
    (filterType: string): ((e: FilterInputEvent) => void) =>
      (e: FilterInputEvent) =>
        onFilterChange({
          [filterType]: (e.target as HTMLInputElement | HTMLSelectElement)
            .value,
        }),
    [onFilterChange],
  );

  return (
    <Container>
      <Header>
        <InputText
          id="search"
          placeHolder="Search publisher name"
          onChange={handleInputChange('publisherName')}
          value={filter.publisherName ?? ''}
        />
        <InputSelect
          options={platformOptions}
          value={filter.platform}
          keyExtractor={({ value }: PlatformOption) => value}
          labelExtractor={({ name }: PlatformOption) => name}
          valueExtractor={({ value }: PlatformOption) => value}
          onChange={handleInputChange('platform')}
        />
      </Header>
      <Results>
        {games.length > 0 ? (
          games.map(
            ({ id, ...props }: Game): React.ReactElement => (
              <VideoGame key={id} {...props} />
            ),
          )
        ) : (
          <>
            <NoResultsHeading>No results</NoResultsHeading>
          </>
        )}
      </Results>
    </Container>
  );
};

const GamesWrapper = (): React.ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const filter: Filter = useSelector(
    (state: RootState): Filter => state.search.filter,
  );
  const games: Game[] = useSelector(
    (state: RootState): Game[] => state.search.filteredGames,
  );
  const platformOptions: PlatformOption[] = useSelector(
    (state: RootState): PlatformOption[] => state.search.platformOptions,
  );
  const handleUpdateFilter = useCallback(
    (updated: Filter): void => {
      const newFilter: Filter = { ...filter, ...updated };

      dispatch(setFilter(newFilter));
      updateSearchParams(newFilter);
    },
    [dispatch, filter],
  );

  useEffect((): void => {
    const filterFromSearch: Filter = filterFromSearchParams(
      window.location.search,
    );

    dispatch(fetchGames()).then((): void => {
      dispatch(setFilter(filterFromSearch));
    });
  }, [dispatch]);

  return (
    <Games
      filter={filter}
      games={games}
      platformOptions={platformOptions}
      onFilterChange={handleUpdateFilter}
    />
  );
};

export default GamesWrapper;
