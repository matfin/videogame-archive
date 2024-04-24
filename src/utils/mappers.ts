import { Platform, PlatformOption, PublisherResponse, Game } from '@models';

export const publishersToGames = (pubishers: PublisherResponse[]): Game[] =>
  pubishers.reduce(
    (acc: Game[], curr: PublisherResponse): Game[] => [
      ...acc,
      ...curr.titles.map(
        (game): Game => ({
          ...game,
          id: crypto.randomUUID(),
          platforms: mappedPlatforms(game.platforms),
          publisherName: curr.name,
        }),
      ),
    ],
    [],
  );

export const toMappedPlatformOptions = (
  owners: PublisherResponse[],
): PlatformOption[] =>
  owners
    .reduce(
      (acc: string[], curr: PublisherResponse): string[] => [
        ...acc,
        ...platformsFromGames(curr.titles),
      ],
      [],
    )
    .reduce(
      (acc: string[], curr: string): string[] =>
        acc.includes(curr) ? acc : [...acc, curr],
      [],
    )
    .map(
      (platform: string): PlatformOption => ({
        name: platform,
        value: platform,
      }),
    );

export const platformsFromGames = (
  titles: { name: string; platforms: string[] }[],
): string[] =>
  titles.reduce(
    (acc: string[], curr): string[] => [...acc, ...curr.platforms],
    [],
  );

export const mappedPlatforms = (platforms: string[] = []): Platform[] =>
  platforms.map((platform: string) => ({
    id: crypto.randomUUID(),
    name: platform,
  }));
