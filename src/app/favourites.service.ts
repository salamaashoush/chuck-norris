import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { IJoke } from './types';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private storageKey = 'favourites';
  private favourites: Map<number, IJoke>;
  public favourites$: BehaviorSubject<IJoke[]>;
  private maxSize = 10;

  constructor(private storageService: StorageService) {
    const favourites = this.storageService.get<IJoke[]>(this.storageKey) ?? [];
    this.favourites = new Map(favourites.map(joke => [joke.id, joke]));
    this.favourites$ = new BehaviorSubject([...this.favourites.values()]);
  }

  /**
   * add a joke to favourites list
   *
   * @param {IJoke} joke
   * @memberof FavouritesService
   */
  add(joke: IJoke): void {
    if (this.canAdd()) {
      this.favourites.set(joke.id, joke);
      this.commit();
    }
  }

  /**
   * remove a joke from favourite list
   *
   * @param {number} jokeId
   * @memberof FavouritesService
   */
  remove(jokeId: number): void {
    this.favourites.delete(jokeId);
    this.commit();
  }

  /**
   * check if joke is in the favourites list
   *
   * @param {number} key
   * @return {boolean}
   * @memberof FavouritesService
   */
  has(key: number): boolean {
    return this.favourites.has(key);
  }

  /**
   * check if favourite list not reached max size
   *
   * @return {*}  {boolean}
   * @memberof FavouritesService
   */
  canAdd(): boolean {
    return this.favourites.size < this.maxSize;
  }

  /**
   * commit change to storage
   *
   * @private
   * @memberof FavouritesService
   */
  private commit(): void {
    const favourites = [...this.favourites.values()];
    this.storageService.set(this.storageKey, favourites);
    this.favourites$.next(favourites);
  }
}
