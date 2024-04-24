import { Filter } from '@models';

export const searchParamsFromFilter = (filter: Filter): string => {
  const cleanedFilter = Object.fromEntries(
    // drop empty values
    Object.entries(filter).filter(([_, value]): boolean => value !== ''),
  );

  return new URLSearchParams(cleanedFilter).toString();
};

export const filterFromSearchParams = (queryString: string): Filter => {
  const filter: Filter = {};
  const urlSearchParams: URLSearchParams = new URLSearchParams(queryString);

  for (const [k, v] of urlSearchParams) {
    filter[k] = v;
  }

  return filter;
};

export const updateSearchParams = (filter: Filter): void => {
  const searchParams: string = searchParamsFromFilter(filter);

  searchParams.length > 0
    ? window.history.replaceState({ filter }, '', `?${searchParams}`)
    : window.history.replaceState(null, '', window.location.pathname);
};
