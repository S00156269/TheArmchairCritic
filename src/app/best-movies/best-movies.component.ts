import { Component, OnInit } from '@angular/core';
import { imdbService } from '../shared/imdb.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-best-movies',
  templateUrl: './best-movies.component.html',
  styleUrls: ['./best-movies.component.css']
})

export class BestMoviesComponent implements OnInit {
  errorMessage: any;
  searchedShows: any[];
  posterURL: string;

  constructor(private _iMDBService: imdbService, private router: Router, private route: ActivatedRoute) { }

  // Heres the poster method again
  getPosterUrl(value)
  {    
    return "https://image.tmdb.org/t/p/w1280" + value;
  }

  GoToMovie(id) {
    // Had to log so that I knew where the issue was [on the page or single route]
    console.log(" Clicked on a movie: " + id);
    //This is where we navigate to the single route, you will notice the id appears with the url
    // this id is then taken within the single route and searched for
      this.router.navigate(['/single'], { queryParams: { id: id } });
    }

  ngOnInit() {
    // log for debugging
    console.log(" Best Movies!!!! ");
    // Search for the best movies voted on
    this._iMDBService.searchBest().subscribe( searchedShows => {
    this.searchedShows = searchedShows.results;
      },
    error=>this.errorMessage=<any>error);
  }

}
