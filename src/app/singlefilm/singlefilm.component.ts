import { IShows } from '../films/iShows';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { imdbService } from '../shared/imdb.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-singlefilm',
  templateUrl: './singlefilm.component.html',
  styleUrls: ['./singlefilm.component.css']
})
export class SinglefilmComponent implements OnInit {
  errorMessage: any;
  _listFilter: string = "";
  showReview: boolean;
  show: IShows;
  posterURL: string;
  
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
  }

  constructor(private _iMDBService: imdbService, private router: Router, private route: ActivatedRoute) {
    this.showReview = false;
  }

  getUrl(value) {
    return "https://image.tmdb.org/t/p/w1280" + value;
  }

  getMovie(value) {
    this._iMDBService.getOneMovie(value)
      .subscribe(res => {
        this.show = res;
      });
  }

  reviewFilm() {
    this.showReview = true;
    console.log(this.showReview);
  }

  ngOnInit() {
    this.route.queryParams
      .filter(params => params.id)
      .subscribe(params => {
        if (params['id']) {
          this.getMovie(params.id);
        }
      });
  }
}