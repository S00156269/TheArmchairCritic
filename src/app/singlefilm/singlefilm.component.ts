import { IShows } from '../films/iShows';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { imdbService } from '../shared/imdb.service';

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
    this.filteredShows = this.listFilter ? this.filterShows(this.listFilter) : this.shows;
  }

  constructor(private _iMDBService: imdbService) { }
  
  filterShows(value: string): IShows[] {
    value = value.toLocaleLowerCase();
    return this.shows.filter((show: IShows) => show.original_title.toLocaleLowerCase().indexOf(value) != -1);
  }

  shows: any[];
  filteredShows: IShows[];
  posterURL: string;
  // coming back as an oject insteadof an array
  // Take it in as an any and try to adapt the Ishows interface on it
  
  getUrl(value)
  {    
    return "https://image.tmdb.org/t/p/w1280" + value;
  }

  public ngOnInit(): void {
    this._iMDBService.getOneMovie().subscribe( shows => {
      this.shows=shows.results, 
      this.filteredShows = this.shows
    },
      error=>this.errorMessage=<any>error);
  }

}
