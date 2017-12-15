import { Component, OnInit } from '@angular/core';
import { imdbService } from '../shared/imdb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(private _iMDBService: imdbService, private router: Router) { }

  // Originally I had this search bar in the search component, however whenever a search was complete 
  // the HTML would create a new search bar at the bottom of the page, so instead I created this 
  // component, containing on the input and button that sends the title to the search component
  // to be displayed on the other component
  StartTheSearch(MovieName) {
    console.log(" Clicked on a movie: " + MovieName);
    this.router.navigate(['/search'], { queryParams: { Title: MovieName } });
  }

  ngOnInit() {
  }

}
