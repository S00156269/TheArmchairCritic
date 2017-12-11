import { Component, OnInit } from '@angular/core';
import { IShows } from '../films/iShows';
import { imdbService } from '../shared/imdb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  errorMessage: any;
  MovieTitle: string;

  constructor(private _iMDBService: imdbService, private router: Router) {}

  searchedShows: any[];
  filteredShows: any[];
  posterURL: string;
  
  getPosterUrl(value)
  {    
    return "https://image.tmdb.org/t/p/w1280" + value;
  }

  sendRequest(MovieTitle) {
    console.log(" SC!!!! " + MovieTitle);
    // RIGHT! the value for the movie title is coming into this log, put not sending to the
    // service
    this._iMDBService.searchMDBMovie(MovieTitle).subscribe( searchedShows => {
      this.router.navigate(['/search'], { queryParams: { Title: MovieTitle } });
      this.searchedShows = searchedShows.results;
    },
      error=>this.errorMessage=<any>error);
  }

  getUrl(value)
  {    
    return "https://image.tmdb.org/t/p/w1280" + value;
  }

  public ngOnInit(): void {
    }
  }
