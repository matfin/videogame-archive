import { createSlice } from '@reduxjs/toolkit';

import { fetchGames } from '@services/search';
import {
  builderPending,
  builderFulfilled,
  builderFailed,
  updateFilter,
} from './state.utils';
import { SearchState } from './types';

export const initialState: SearchState = {
  isLoading: false,
  error: null,
  filter: {
    publisherName: '',
    platform: '',
  },
  games: [],
  platformOptions: [],
  filteredGames: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setFilter: updateFilter,
    reset: (): SearchState => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGames.pending, builderPending);
    builder.addCase(fetchGames.fulfilled, builderFulfilled);
    builder.addCase(fetchGames.rejected, builderFailed);
  },
});

export const { setFilter, reset } = searchSlice.actions;
export { fetchGames };
export default searchSlice.reducer;
