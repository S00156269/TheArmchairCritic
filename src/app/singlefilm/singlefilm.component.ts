import { IShows } from '../shared/iShows';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { imdbService } from '../shared/imdb.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../shared/data-service.service';
import { Review } from '../review';

@Component({
  selector: 'app-singlefilm',
  templateUrl: './singlefilm.component.html',
  styleUrls: ['./singlefilm.component.css']
})
export class SinglefilmComponent implements OnInit {
  errorMessage: any;
  _listFilter: string = "";
  show: IShows;
  posterURL: string;
  reviews: any[];
  review: boolean;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
  }

  constructor(private _iMDBService: imdbService, private router: Router, private route: ActivatedRoute, private data: DataServiceService) {
    this.review = false;
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

  getReviews(id) {
    this.data.getReviewsForFilm(id).subscribe(res => {
      console.log(res);
      this.reviews = res;
    });
  }

  writeReview() {
    this.review = true;
  }

  //Grabs the movie id on init so we can show the movie and get its reviews
  ngOnInit() {
    this.route.queryParams
      .filter(params => params.id)
      .subscribe(params => {
        if (params['id']) {
          this.getMovie(params.id);
          this.getReviews(params.id);
        }
      });
  }
}