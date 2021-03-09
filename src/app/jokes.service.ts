import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map, pluck, tap } from 'rxjs/operators';
import { IApiResponse, IJoke } from './types';
import { buildApiUrl } from './utils';

@Injectable({
  providedIn: 'root',
})
export class JokesService {
  /**
   * jokes subject used to cache api result
   *
   * @memberof JokesService
   */
  public jokes$ = new BehaviorSubject<IJoke[]>([]);

  constructor(private httpClient: HttpClient) {}

  /**
   * load 10 jokes and push to cache
   *
   * @return {*}
   * @memberof JokesService
   */
  loadAll(): Observable<IJoke[]> {
    return this.getRandomJokes(10).pipe(
      tap(value => this.jokes$.next(value)),
      first()
    );
  }

  /**
   * get one random joke
   *
   * @return {Observable<IJoke>}
   * @memberof JokesService
   */
  getRandomJoke(): Observable<IJoke> {
    return this.getRandomJokes(1).pipe(
      map(value => value[0]),
      first()
    );
  }

  /**
   * get specified amount of random jokes
   *
   * @private
   * @param {number} count
   * @return {Observable<IJoke[]>}
   * @memberof JokesService
   */
  private getRandomJokes(count: number): Observable<IJoke[]> {
    return this.httpClient
      .get<IApiResponse<IJoke[]>>(buildApiUrl(`/jokes/random/${count}`))
      .pipe(pluck('value'));
  }
}
