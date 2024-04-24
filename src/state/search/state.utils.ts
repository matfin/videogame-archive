import { PayloadAction } from '@reduxjs/toolkit';

import { SearchState } from './types';
import {
  Filter,
  Platform,
  PlatformOption,
  Game,
  PublisherResponse,
} from '@models';
import { toMappedPlatformOptions, publishersToGames } from '@utils/mappers';

const builderPending = (state: SearchState): void => {
  state.error = null;
  state.isLoading = true;
};

const builderFulfilled = (
  state: SearchState,
  action: PayloadAction<PublisherResponse[]>,
): void => {
  const publishers: PublisherResponse[] = action.payload;
  const platformOptions: PlatformOption[] = [
    { name: 'All platforms', value: '' },
    ...toMappedPlatformOptions(publishers),
  ];
  const remappedToGames: Game[] = publishersToGames(publishers);

  state.error = null;
  state.isLoading = false;
  state.games = remappedToGames;
  state.filteredGames = remappedToGames;
  state.platformOptions = platformOptions;
};

const builderFailed = (state: SearchState): void => {
  state.error = new Error('Failed to fetch games');
  state.isLoading = false;
};

const filterByPubisherNameFn = ({
  publisherName: publisherNameFilter,
}: Filter): ((game: Game) => boolean) => {
  return ({ publisherName }: Game): boolean =>
    Boolean(publisherNameFilter)
      ? publisherName.toLowerCase().includes(publisherNameFilter.toLowerCase())
      : true;
};

const filterByPlatformFn = ({
  platform: platformFilter,
}: Filter): ((game: Game) => boolean) => {
  return ({ platforms }: Game): boolean =>
    Boolean(platformFilter)
      ? platforms.find(
          ({ name }: Platform): boolean =>
            name.toLowerCase() === platformFilter.toLowerCase(),
        ) !== undefined
      : true;
};

const updateFilter = (
  state: SearchState,
  action: PayloadAction<Filter>,
): void => {
  const filter: Filter = action.payload;

  const filteredGames: Game[] = state.games
    .filter(filterByPubisherNameFn(filter))
    .filter(filterByPlatformFn(filter));

  state.filter = action.payload;
  state.filteredGames = filteredGames;
};

export {
  filterByPubisherNameFn,
  filterByPlatformFn,
  updateFilter,
  builderPending,
  builderFulfilled,
  builderFailed,
};
