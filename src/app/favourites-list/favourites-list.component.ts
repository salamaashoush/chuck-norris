import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IJoke } from '../types';
import { FAVOURITES_LIST_TEST_IDS } from './test-ids';

@Component({
  selector: 'app-favourites-list',
  templateUrl: './favourites-list.component.html',
})
export class FavouritesListComponent {
  @Input() favourites: IJoke[] = [];
  @Output() remove = new EventEmitter<IJoke>(true);
  public testIds: typeof FAVOURITES_LIST_TEST_IDS = FAVOURITES_LIST_TEST_IDS;
}
