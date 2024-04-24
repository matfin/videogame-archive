export interface PublisherResponse {
  name: string;
  titles: {
    name: string;
    platforms: string[];
  }[];
}

export interface Platform {
  id: string;
  name: string;
}

export interface PlatformOption {
  name: string;
  value: string;
}

export interface Game {
  id: string;
  name: string;
  publisherName: string;
  platforms: Platform[];
}

export interface Filter {
  [index: string]: string;
}
