import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FavouritesListComponent } from './favourites-list/favourites-list.component';
import { JokesListComponent } from './jokes-list/jokes-list.component';

@NgModule({
  declarations: [AppComponent, JokesListComponent, FavouritesListComponent],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
