import { IJoke } from '../types';

export const JOKES_LIST_TEST_IDS = {
  addToFavourites: (joke: IJoke) => `${joke.id}-add-to-favourites`,
  removeFromFavourites: (joke: IJoke) => `${joke.id}-remove-from-favourites`,
  joke: (joke: IJoke) => `${joke.id}-joke`,
};
