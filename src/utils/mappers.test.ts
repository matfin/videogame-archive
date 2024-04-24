import { Platform, PlatformOption, Game, PublisherResponse } from '@models';

import {
  mappedPlatforms,
  platformsFromGames,
  publishersToGames,
  toMappedPlatformOptions,
} from './mappers';

describe('mappers', (): void => {
  it('should remap the publisher response to games', (): void => {
    const publishers: PublisherResponse[] = [
      {
        name: 'Rovio',
        titles: [
          { name: 'Angry Birds', platforms: ['iOS', 'Android'] },
          { name: 'Angry Cattle', platforms: ['Snes', 'PlayStation'] },
        ],
      },
    ];
    const result: Game[] = [
      {
        id: expect.any(String),
        name: 'Angry Birds',
        publisherName: 'Rovio',
        platforms: [
          { id: expect.any(String), name: 'iOS' },
          { id: expect.any(String), name: 'Android' },
        ],
      },
      {
        id: expect.any(String),
        name: 'Angry Cattle',
        publisherName: 'Rovio',
        platforms: [
          { id: expect.any(String), name: 'Snes' },
          { id: expect.any(String), name: 'PlayStation' },
        ],
      },
    ];

    expect(publishersToGames(publishers)).toEqual(result);
  });

  it('should return remapped platforms', (): void => {
    const platforms: string[] = ['Snes', 'Wii', 'GameBoy'];
    const result: Platform[] = [
      { id: expect.any(String), name: 'Snes' },
      { id: expect.any(String), name: 'Wii' },
      { id: expect.any(String), name: 'GameBoy' },
    ];

    expect(mappedPlatforms(platforms)).toEqual(result);
    expect(mappedPlatforms()).toEqual([]);
  });

  it('should return platforms from a list of games', (): void => {
    const games: { name: string; platforms: string[] }[] = [
      { name: 'Sonic', platforms: ['Megadrive', 'Dreamcast'] },
      { name: 'Mario', platforms: ['Snes', 'Wii'] },
    ];
    const result: string[] = ['Megadrive', 'Dreamcast', 'Snes', 'Wii'];

    expect(platformsFromGames(games)).toEqual(result);
  });

  it('should return a unique collection of platforms', (): void => {
    const publishers: PublisherResponse[] = [
      {
        name: 'Nintendo',
        titles: [
          { name: 'Metroid', platforms: ['Snes', 'Wii'] },
          { name: 'Mario', platforms: ['GameBoy', 'Switch'] },
          { name: 'Mario Kart', platforms: ['Snes', 'N64'] },
          { name: 'Kirby', platforms: ['Snes'] },
        ],
      },
    ];
    const result: PlatformOption[] = [
      { name: 'Snes', value: 'Snes' },
      { name: 'Wii', value: 'Wii' },
      { name: 'GameBoy', value: 'GameBoy' },
      { name: 'Switch', value: 'Switch' },
      { name: 'N64', value: 'N64' },
    ];

    expect(toMappedPlatformOptions(publishers)).toEqual(result);
  });
});
