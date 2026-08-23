// Type definitions for the Joke Generator feature

export interface ProcessedJoke {
  id: string;
  text: string;
  category: string;
  type: 'single' | 'twopart';
  setup?: string;
  delivery?: string;
}

export interface JokeApiResponse {
  error: boolean;
  category: string;
  type: string;
  joke?: string;
  setup?: string;
  delivery?: string;
  flags: JokeFlags;
}

export interface JokeFlags {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
  explicit: boolean;
}
