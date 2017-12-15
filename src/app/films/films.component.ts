import { IShows } from '../shared/iShows';
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

  // Using the services from the share folder
  // Have to add router function to send across information from pages
  constructor(private _iMDBService: imdbService, private router: Router) {}
  
  // Tried to use the the Ishows class however this was not allowing the poster to come through
  // Decided to use any for the shows and a string for the poster URL
  shows: any[];
  posterURL: string;
  
  // The poster is displayed by adding the title to the end of the string show below
  // this is implemented whereever a posteris shown
  getUrl(value)
  {    
    return "https://image.tmdb.org/t/p/w1280" + value;
  }

  // When a poster is clicked I want take the single movie id bring it to the single route
  // and then with that ID, find the movie and re display it
  GoToMovie(id) {
    // Had to log so that I knew where the issue was [on the page or single route]
    console.log(" Clicked on a movie: " + id);
    //This is where we navigate to the single route, you will notice the id appears with the url
    // this id is then taken within the single route and searched for
      this.router.navigate(['/single'], { queryParams: { id: id } });
    }

    // This is done immediatly when the page is initialised
    // The method will fill the shows with 20 popular movies
  public ngOnInit(): void {
    this._iMDBService.getiMDB().subscribe( shows => {
      this.shows = shows.results
    },
      error=>this.errorMessage=<any>error);
  }

}