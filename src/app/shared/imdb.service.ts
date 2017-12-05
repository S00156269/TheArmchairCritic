import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { IShows } from '../films/iShows';
import 'rxjs/add/operator/map';

@Injectable()
export class imdbService {
  private _iMDBURL: string = 'https://api.themoviedb.org/3/';
  // CANT PARSE THE POSTERS
  // 'http://img.omdbapi.com/?i=tt1285016&apikey=d3908ab8'
  // Returning a json format movie
  // 'http://www.omdbapi.com/?i=tt1285016&apikey=d3908ab8';
  constructor(private _http: HttpClient) { }

  /* 
getiMDB(value): Observable<IShows[]> {
  return this._http.get<IShows[]>(this._iMDBURL+value+"&apikey=d3908ab8")
*/
  getiMDB(): Observable<any> {
    return this._http.get<any>(this._iMDBURL + 'movie/popular?api_key=b1486a6362ec4507649074230d7aa50b&language=en-US&page=1')
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  // How do I pass the movie title?
  searchMDBMovie(MovieTitle) : Observable<any>{
    return this._http.get<any>(this._iMDBURL + 'search/movie?api_key=b1486a6362ec4507649074230d7aa50b&language=en-US&query=' + MovieTitle + '&page=1&include_adult=false')
    .do(data => console.log('All: ' + JSON.stringify(data)))
    .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}