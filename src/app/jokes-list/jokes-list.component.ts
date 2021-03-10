import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IJoke } from '../types';
import { JOKES_LIST_TEST_IDS } from './test-ids';

@Component({
  selector: 'app-jokes-list',
  templateUrl: './jokes-list.component.html',
})
export class JokesListComponent {
  @Input() jokes: IJoke[] = [];
  @Input() canAddFavourites = true;
  @Output() addToFavourites = new EventEmitter<IJoke>(true);
  @Output() removeFromFavourites = new EventEmitter<IJoke>(true);

  // ideally in large apps we should abstract this to a directive and a service
  public testIds: typeof JOKES_LIST_TEST_IDS = JOKES_LIST_TEST_IDS;
  @Input() isFavouredJoke = (joke: IJoke) => false;
}
