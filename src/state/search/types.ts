import { Filter, PlatformOption, Game } from '@models';

export interface SearchState {
  isLoading: boolean;
  error: Error | null;
  filter: Filter;
  games: Game[];
  platformOptions: PlatformOption[];
  filteredGames: Game[];
}
