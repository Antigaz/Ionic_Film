import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { map } from 'rxjs/operators';


/*
  Generated class for the PageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CallApiProvider {

  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  url;
  apiKey: '551f90f9';

  constructor(public http: HttpClient) {

  }

  getListItems() {
    return this.items;
  }

  load(movieTitle) {
    return this.http.get('http://www.omdbapi.com/?s=' + movieTitle + '&apikey=551f90f9' + '&Type=movie').pipe(
      map(results => results['Search'])
    );
  }

  loadSerie(serieTitle) {
    return this.http.get('http://www.omdbapi.com/?s=' + serieTitle + '&apikey=551f90f9' + '&Type=series').pipe(
      map(results => results['Search'])
    );
  }

  searchItemById(imdbID) {
    this.url = 'http://www.omdbapi.com/?apikey=551f90f9&i=' + imdbID + '&plot=full';
    return this.http.get(this.url).pipe(
      map(results => {
        console.log(results);
        return results
      })
    );
  }

  searchMovies(imdbID) {
    this.url = 'http://www.omdbapi.com/?apikey=551f90f9&i=' + imdbID;
    return this.http.get(this.url).pipe(
      map(results => {
        console.log(results);
        return results
      })
    );
  }

}
