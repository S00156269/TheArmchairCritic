import { IShows } from '../shared/iShows';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { imdbService } from '../shared/imdb.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-singlefilm',
  templateUrl: './singlefilm.component.html',
  styleUrls: ['./singlefilm.component.css']
})
export class SinglefilmComponent implements OnInit {
  errorMessage: any;
  _listFilter: string = "";

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
  }

  constructor(private _iMDBService: imdbService, private router: Router, private route: ActivatedRoute) { }

  shows: IShows;
  posterURL: string;
  
  // Display the poster
  getUrl(value)
  {    
    return "https://image.tmdb.org/t/p/w1280" + value;
  }

  // This method will get one film, when a poster is clicked the id of the movie is send with it, this method
  // then uses the id and searched the movieDB to display a bigger poster and details about the movie
  getMovie(value) {
    this._iMDBService.getOneMovie(value)
      .subscribe(res => {
        this.shows = res;
      });
  }

  // This is how the movie is searched for, as you can see the params is the id, this is what I used to search
  // for the movie and display it on initialize
   ngOnInit() {
      this.route.queryParams
      .filter(params => params.id)
      .subscribe(params => {
        if (params['id']){
          this.getMovie(params.id);
        }
      });
    }
  }


    /*
    this._iMDBService.getOneMovie().subscribe( shows => {
      this.shows=shows.results */
      
