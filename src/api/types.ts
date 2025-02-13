// src/types.ts

// The top-level response from the API
export interface ITunesResponse {
  feed: ITunesFeed;
}
// Interface for the feed that contains all entries and possibly other metadata
export interface ITunesFeed {
  author: {
    name: { label: string };
    uri: { label: string };
  };
  entry: ITunesEntry[];
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  image: string;
  albumUrl: string;
  releaseDate: Date
}

// Interface for an image in the entry
export interface ITunesImage {
  label: string;
  attributes: {
    height: string;
  };
}

// Interface for an individual entry (album)
export interface ITunesEntry {
  "im:name": { label: string };
  "im:image": ITunesImage[];
  link: {
    attributes: {
      href: string;
      rel?: string;
      type?: string;
    };
  };
  id: {
    label: string;
    attributes: {
      "im:id": string;
    };
  };
  "im:artist": {
    label: string;
    attributes?: {
      href?: string;
    };
  };
  "im:releaseDate"?: {
    label: string;
    attributes: { label: string };
  };
}



export interface TopSongsResponse {
  feed: {
    entry: Array<{
      title: {
        label: string;
      };
      "im:artist": {
        label: string;
      };
    }>;
  };
}

export interface TopVideoResponse {
  feed: {
    entry: Array<{
      title: {
        label: string;
      };
      "im:artist": {
        label: string;
      };
    }>;
  };
}

export type FilterOption = 'title' | 'artist' | 'latest';

export interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: FilterOption;      
  setFilter: (filter: FilterOption) => void; 
}