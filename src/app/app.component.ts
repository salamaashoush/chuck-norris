import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { interval, Observable, race } from 'rxjs';
import { filter, repeatWhen, switchMap, switchMapTo, takeUntil, tap } from 'rxjs/operators';
import { FavouritesService } from './favourites.service';
import { JokesService } from './jokes.service';
import { APP_TEST_IDS } from './test-ids';
import { IJoke } from './types';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public getRandomJokeForm = new FormControl(false);
  public testIds: typeof APP_TEST_IDS = APP_TEST_IDS;

  constructor(public favouritesService: FavouritesService, public jokesService: JokesService) {
    this.jokesService.loadAll().subscribe();
    this.startRandomJokePolling().pipe(untilDestroyed(this)).subscribe();
  }
  isFavouredJoke = (joke: IJoke): boolean => {
    return this.favouritesService.has(joke.id);
  };

  handleAddToFavourites(joke: IJoke): void {
    this.favouritesService.add(joke);
  }

  handleRemoveFromFavourites(joke: IJoke): void {
    this.favouritesService.remove(joke.id);
  }

  handleRefreshJokes(): void {
    this.jokesService.loadAll().subscribe();
  }

  startRandomJokePolling(): Observable<any> {
    // emits only if checked
    const checked$ = this.getRandomJokeForm.valueChanges.pipe(filter(checked => checked));

    // emits only if not checked
    const notChecked$ = this.getRandomJokeForm.valueChanges.pipe(filter(checked => !checked));

    // emits only if greater than 10
    const greaterThan10$ = this.favouritesService.favourites$.pipe(
      filter(favourites => favourites.length >= 10)
    );

    // emits only if less 10
    const lessThan10$ = this.favouritesService.favourites$.pipe(
      filter(favourites => favourites.length < 10)
    );

    // emits only if not checked or favourites list has less than 10 items
    const start$ = race([lessThan10$, checked$]);

    // emits only if not checked or favourites list has 10 or more items
    const stop$ = race([greaterThan10$, notChecked$]);

    // emits every 5 seconds and get random joke if checked
    const jokePolling$ = interval(5000).pipe(
      filter(() => this.getRandomJokeForm.value),
      takeUntil(stop$),
      switchMap(() => this.jokesService.getRandomJoke()),
      tap(joke => this.favouritesService.add(joke))
    );

    // emits only if start emit any value which will start the timer
    return start$.pipe(
      switchMapTo(jokePolling$),
      repeatWhen(() => start$)
    );
  }
}
