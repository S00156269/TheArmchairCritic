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


  _listFilter: string = "";
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredShows = this.listFilter ? this.filterShows(this.listFilter) : this.searchedShows;
  }

  constructor(private _iMDBService: imdbService, private router: Router) {}

  
  filterShows(value: string): IShows[] {
    value = value.toLocaleLowerCase();
    return this.searchedShows.filter((show: IShows) => show.original_title.toLocaleLowerCase().indexOf(value) != -1);
  }

  searchedShows: any[];
  filteredShows: IShows[];
  posterURL: string;
  
  getUrl(value)
  {    
    return "https://image.tmdb.org/t/p/w1280" + value;
  }

  sendRequest(value)
  {
    // Need to route the shit outta this
    this._iMDBService.searchMDBMovie(this.MovieTitle).subscribe( shows => {
      this.searchedShows=shows.results;
      this.router.navigateByUrl("/details");
    },
      error=>this.errorMessage=<any>error);
  }

  public ngOnInit(): void {
    
  }
}
