import { PayloadAction } from '@reduxjs/toolkit';

import { Game, PublisherResponse } from '@models';
import { SearchState } from './types';
import { publishersToGames } from '@utils/mappers';
import { initialState } from './searchSlice';
import {
  filterByPubisherNameFn,
  filterByPlatformFn,
  updateFilter,
  builderPending,
  builderFulfilled,
  builderFailed,
} from './state.utils';

describe('search state utils', (): void => {
  it('should update the state on async builder pending', (): void => {
    const state: SearchState = { ...initialState };

    builderPending(state);
    expect(state.error).toBeNull();
    expect(state.isLoading).toBe(true);
  });

  it('should update the state on async builder fulfilled with data', (): void => {
    const state: SearchState = { ...initialState };
    const action: PayloadAction<PublisherResponse[]> = {
      type: '',
      payload: [
        {
          name: 'Matt',
          titles: [
            { name: 'Duke Nuken', platforms: ['Snes', 'PlayStation', 'PC'] },
            { name: 'Doom', platforms: ['Jaguar', 'Saturn'] },
          ],
        },
        {
          name: 'John',
          titles: [{ name: 'Mario', platforms: ['Switch', 'Snes'] }],
        },
      ],
    };
    const mappedGames: Game[] = publishersToGames(action.payload);

    builderFulfilled(state, action);
    expect(state.error).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.games).toEqual(mappedGames);
    expect(state.filteredGames).toEqual(mappedGames);
    expect(state.platformOptions).toHaveLength(7);
  });

  it('should update the state on async builder failed', (): void => {
    const state: SearchState = { ...initialState };

    builderFailed(state);
    expect(state.error).toEqual(new Error('Failed to fetch games'));
    expect(state.isLoading).toBe(false);
  });
});

describe('filter functions', (): void => {
  const game: Game = {
    id: '1',
    name: 'Doom',
    publisherName: 'ID Software',
    platforms: [
      { id: '1', name: 'Snes' },
      { id: '2', name: 'PlayStation' },
    ],
  };

  it('applies the pubisher name filter', (): void => {
    expect(filterByPubisherNameFn({ publisherName: 'so' })(game)).toBe(true);
    expect(filterByPubisherNameFn({ publisherName: 'Apo' })(game)).toBe(false);
    expect(filterByPubisherNameFn({})(game)).toBe(true);
  });

  it('applies the platform filter', (): void => {
    expect(filterByPlatformFn({ platform: 'Snes' })(game)).toBe(true);
    expect(filterByPlatformFn({ platform: '' })(game)).toBe(true);
    expect(filterByPlatformFn({})(game)).toBe(true);
  });

  it('updates the filter', (): void => {
    const games: Game[] = [
      {
        id: '1',
        name: 'Daytona USA',
        publisherName: 'Sega',
        platforms: [
          { id: '1', name: 'Saturn' },
          { id: '2', name: 'Dreamcast' },
        ],
      },
      {
        id: '2',
        name: 'Tekken',
        publisherName: 'Namco',
        platforms: [
          { id: '1', name: 'PlayStation' },
          { id: '2', name: 'XBox' },
        ],
      },
    ];
    const state: SearchState = {
      ...initialState,
      games,
      filter: {},
    };

    updateFilter(state, {
      type: '',
      payload: { publisherName: 'Se', platform: 'Saturn' },
    });

    expect(state.filter).toEqual({ publisherName: 'Se', platform: 'Saturn' });
    expect(state.filteredGames).toEqual([games[0]]);
  });
});
