import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { IShows } from '../shared/iShows';
import 'rxjs/add/operator/map';

// Okay this is where I use services for the app to use the MovieDB api
@Injectable()
export class imdbService {
  // The begining of the call method starts as such, some requests have different starting characters
  // and some have a mix of string + passed value + string
  private _iMDBURL: string = 'https://api.themoviedb.org/3/';
  private _TheMovieDb: string = 'https://api.themoviedb.org/3/movie/';
  private _TheBestDB: string = 'https://api.themoviedb.org/3/discover/movie?api_key=b1486a6362ec4507649074230d7aa50b&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=true&page=1';
  private _TheWorstDB: string = 'https://api.themoviedb.org/3/discover/movie?api_key=b1486a6362ec4507649074230d7aa50b&language=en-US&sort_by=vote_average.asc&include_adult=false&include_video=true&page=1';

  constructor(private _http: HttpClient) { }

  // This method get 20 popular films that is displayed in the popular films route, returns Json
  getiMDB(): Observable<any> {
    return this._http.get<any>(this._iMDBURL + 'movie/popular?api_key=b1486a6362ec4507649074230d7aa50b&language=en-US&page=1')
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  // This method searched for a movie, I pass a value into the method using the string above then the title then another 
  // string I can search the entire DB and display whatever is related
  searchMDBMovie(value) : Observable<any>{

    console.log("SC2!!!! " + value)
    return this._http.get<any>(this._iMDBURL + 'search/movie?api_key=b1486a6362ec4507649074230d7aa50b&language=en-US&query=' + value + '&page=1&include_adult=false')
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  // This method returns the Json of one film that is used to display the single film
  getOneMovie(value): Observable<any> {
    return this._http.get<any>(this._TheMovieDb + value + '?api_key=b1486a6362ec4507649074230d7aa50b')
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  // Search for the best voted movies
  searchBest(): Observable<any> {
    return this._http.get<any>(this._TheBestDB)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  searchWorst(): Observable<any> {
    return this._http.get<any>(this._TheWorstDB)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }


  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}