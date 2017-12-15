import { Component, OnInit } from '@angular/core';
import { IShows } from '../shared/iShows';
import { imdbService } from '../shared/imdb.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  errorMessage: any;
  MovieTitle: string;


  constructor(private _iMDBService: imdbService, private router: Router, private route: ActivatedRoute) { }

  searchedShows: any[];
  filteredShows: any[];
  posterURL: string;

  // Heres the poster method again
  getPosterUrl(value)
  {    
    return "https://image.tmdb.org/t/p/w1280" + value;
  }

  // When a user enter a title into the search bar the title is sent here, fromhere it is sent to the
  // services, returning a list of movies
  sendRequest(MovieTitle) {
    // log for debugging
    console.log(" Searched!!!! " + MovieTitle);
    // RIGHT! the value for the movie title is coming into this log, but not sending to the
    // service ---------------- Completed!
    this._iMDBService.searchMDBMovie(MovieTitle).subscribe( searchedShows => {
      this.searchedShows = searchedShows.results;
    },
      error => this.errorMessage = <any>error);
  }

  // Navigate to single page, send with the ID on the URL
  GoToMovie(id) {
    console.log(" Clicked on a searched movie: " + id);
      this.router.navigate(['/single'], { queryParams: { id: id } });
    }

    // This is the inital response to the page loading, once loaded the method
    // will take the title, search the movie and display it
    ngOnInit() {
      this.route.queryParams
        .filter(params => params.Title)
        .subscribe(params => {
          if (params['Title']) {
            this.sendRequest(params.Title);
          }
        });
    }

  }
