import {
  searchParamsFromFilter,
  filterFromSearchParams,
  updateSearchParams,
} from './filters';

describe('filters', (): void => {
  it('should return the correct URLSearchParams from a filter', (): void => {
    expect(
      searchParamsFromFilter({ publisherName: 'RareWare', platform: 'Snes' }),
    ).toEqual('publisherName=RareWare&platform=Snes');

    expect(
      searchParamsFromFilter({ publisherName: '', platform: 'Megadrive' }),
    ).toEqual('platform=Megadrive');
  });

  it('should return the correct filter from url search params', (): void => {
    expect(
      filterFromSearchParams('publisherName=Capcom&platform=Snes'),
    ).toEqual({
      publisherName: 'Capcom',
      platform: 'Snes',
    });
  });

  it('should replace window history given a filter', (): void => {
    jest.spyOn(window.history, 'replaceState');

    updateSearchParams({ publisherName: 'Sony', platform: 'PlayStation' });

    expect(window.history.replaceState).toHaveBeenCalledTimes(1);
    expect(window.history.replaceState).toHaveBeenCalledWith(
      { filter: { platform: 'PlayStation', publisherName: 'Sony' } },
      '',
      '?publisherName=Sony&platform=PlayStation',
    );
  });

  it('should replace window history given an empty filter', (): void => {
    jest.spyOn(window.history, 'replaceState');

    updateSearchParams({});

    expect(window.history.replaceState).toHaveBeenCalledTimes(1);
    expect(window.history.replaceState).toHaveBeenCalledWith(
      null,
      '',
      window.location.pathname,
    );
  });
});
