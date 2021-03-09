import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { JokesService } from './jokes.service';
import { JOKES_MOCK } from './mocks/jokes';
import { buildApiUrl } from './utils';

describe('JokesService', () => {
  let service: JokesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JokesService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(JokesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch jokes', () => {
    service.loadAll().subscribe(jokes => {
      expect(jokes.length).toEqual(JOKES_MOCK.length);
      expect(jokes[0].id).toEqual(JOKES_MOCK[0].id);
    });
    const req = httpTestingController.expectOne(buildApiUrl(`/jokes/random/10`));
    req.flush(JOKES_MOCK);
  });

  it('should fetch one joke', () => {
    service.getRandomJoke().subscribe(joke => {
      console.log(joke);
      expect(joke.id).toEqual(JOKES_MOCK[0].id);
    });
    const req = httpTestingController.expectOne(buildApiUrl(`/jokes/random/1`));
    req.flush(JOKES_MOCK);
  });
});
