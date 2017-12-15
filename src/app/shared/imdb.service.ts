import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { IShows } from '../shared/iShows';
import 'rxjs/add/operator/map';

@Injectable()
export class imdbService {
  private _iMDBURL: string = 'https://api.themoviedb.org/3/';
  private _TheMovieDb: string = 'https://api.themoviedb.org/3/movie/';

  constructor(private _http: HttpClient) { }

  getiMDB(): Observable<any> {
    return this._http.get<any>(this._iMDBURL + 'movie/popular?api_key=b1486a6362ec4507649074230d7aa50b&language=en-US&page=1')
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  // How do I pass the movie title?
  searchMDBMovie(value): Observable<any> {
    console.log("SC2!!!! " + value)
    return this._http.get<any>(this._iMDBURL + 'search/movie?api_key=b1486a6362ec4507649074230d7aa50b&language=en-US&query=' + value + '&page=1&include_adult=false')
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getOneMovie(value): Observable<any> {
    return this._http.get<any>(this._TheMovieDb + value + '?api_key=b1486a6362ec4507649074230d7aa50b')
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}