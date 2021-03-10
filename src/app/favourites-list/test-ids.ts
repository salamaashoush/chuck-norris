import { IJoke } from '../types';

export const FAVOURITES_LIST_TEST_IDS = {
  remove: (joke: IJoke) => `${joke.id}-remove`,
  favourite: (joke: IJoke) => `${joke.id}-favourite`,
};
