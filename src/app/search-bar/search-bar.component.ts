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

  StartTheSearch(MovieName) {
    console.log(" Clicked on a movie: " + MovieName);
    this.router.navigate(['/search'], { queryParams: { Title: MovieName } });
  }

  ngOnInit() {
  }

}
