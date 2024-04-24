import { createAsyncThunk } from '@reduxjs/toolkit';

import { PublisherResponse } from '@models';

export const fetchGames = createAsyncThunk(
  'search/fetchGames',
  async (): Promise<PublisherResponse[]> => {
    const response: Response = await fetch(
      'http://localhost:3001/api/publishers',
    );

    const data: { publishers: PublisherResponse[] } = await response.json();

    return data.publishers;
  },
);
