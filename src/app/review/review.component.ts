import { DataServiceService } from '../shared/data-service.service';
import { Observable } from 'rxjs/Rx';
import { imdbService } from '../shared/imdb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../review';
import { AngularFireAuth } from 'angularfire2/auth';
import { Reviewer } from '../reviewer';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  content: string;
  rating: number;
  review: Review;
  showReview: boolean;
  currentReviewer: any;
  reviewID: number;
  @Input() movieID: string;
  @Input() movieName: string;
  
  constructor(private service: DataServiceService, public afa: AngularFireAuth, public router: Router,  private route: ActivatedRoute, private _iMDBService: imdbService) { 
    this.reviewID = Date.now();
    this.currentReviewer = new Observable<any>();
    console.log("attempt to get user");
    this.service.getUser().subscribe(value => {
    this.currentReviewer = value,
    console.log(this.currentReviewer);
    });
  }

  createReview(content, rating){
    var user = this.afa.auth.currentUser;
    if (!user) {
      this.router.navigate(['login']);    
    }
    this.content = content;
    this.rating = rating;
    console.log(this.movieID);
    this.service.createReview(this.formatPost(this.service.uid, this.currentReviewer, this.content, this.rating), this.movieID, this.reviewID)
  }

  formatPost(uid, user, content, rating): any {
    console.log(user.Name);
    return {
      "AuthorUID": uid,      
      "AuthorName": user.Name,
      "Content": content,
      "Score": rating
    }
  }
}
