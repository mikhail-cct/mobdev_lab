import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const STORAGE_KEY = 'favouriteFilms';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(private storage: Storage) { }

  getAllFavouriteFilms() {
    return this.storage.get(STORAGE_KEY)
  }

  isFavourite(filmId) {
    return this.getAllFavouriteFilms().then(result => {
      return result && result.indexOf(filmId) !== -1;
    });
  }

  favouriteFilm(filmId) {
    return this.getAllFavouriteFilms().then(result => {
      if (result) {
        result.push(filmId);
        return this.storage.set(STORAGE_KEY, result);
      } else {
        return this.storage.set(STORAGE_KEY, [filmId]);
      }
    });
  }

  unfavouriteFilm(filmId) {
    return this.getAllFavouriteFilms().then(result => {
      if (result) {
        var index = result.indexOf(filmId);
        result.splice(index, 1);
        return this.storage.set(STORAGE_KEY, result);
      }
    });
  }

}