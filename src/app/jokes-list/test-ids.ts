import { IJoke } from '../types';

export const JOKES_LIST_TEST_IDS = {
  addToFavourites: (joke: Partial<IJoke>) => `${joke.id}-add-to-favourites`,
  removeFromFavourites: (joke: Partial<IJoke>) => `${joke.id}-remove-from-favourites`,
  joke: (joke: Partial<IJoke>) => `joke-${joke.id}`,
  jokesList: 'jokes-list',
};
