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

  constructor(private _iMDBService: imdbService, private router: Router, private route: ActivatedRoute) {}

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
      this.searchedShows = searchedShows.results;
    },
      error=>this.errorMessage=<any>error);
  }

  getUrl(value)
  {    
    return "https://image.tmdb.org/t/p/w1280" + value;
  }

  GoToMovie(id) {
    console.log(" Clicked on a searched movie: " + id);
      this.router.navigate(['/single'], { queryParams: { id: id } });
    }

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
