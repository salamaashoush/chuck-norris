import { TestBed } from '@angular/core/testing';
import { FavouritesService } from './favourites.service';
import { JOKES_MOCK } from './mocks/jokes';

describe('favouritesService', () => {
  let service: FavouritesService;
  const mockedJoke = JOKES_MOCK[0];
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add favourite', () => {
    service.add(mockedJoke);
    service.favourites$.subscribe(jokes => {
      expect(jokes.length).toEqual(1);
      expect(jokes[0].id).toEqual(mockedJoke.id);
    });
  });

  it('should remove favourite', () => {
    service.add(mockedJoke);
    service.remove(mockedJoke.id);
    service.favourites$.subscribe(jokes => {
      expect(jokes.length).toEqual(0);
    });
  });
});
