import { IShows } from '../films/iShows';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { imdbService } from '../shared/imdb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FilmsComponent implements OnInit {
  errorMessage: any;

  constructor(private _iMDBService: imdbService, private router: Router) {}
  
  shows: any[];
  posterURL: string;
  // coming back as an oject insteadof an array
  // Take it in as an any and try to adapt the Ishows interface on it
  
  getUrl(value)
  {    
    return "https://image.tmdb.org/t/p/w1280" + value;
  }

  GoToMovie(id) {
    console.log(" Clicked on a movie: " + id);
      this.router.navigate(['/single'], { queryParams: { id: id } });
    }

  public ngOnInit(): void {
    this._iMDBService.getiMDB().subscribe( shows => {
      this.shows = shows.results
    },
      error=>this.errorMessage=<any>error);
  }

}