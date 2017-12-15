import { Component, OnInit, Input } from '@angular/core';
import { Review } from '../review';
import { AngularFireAuth } from 'angularfire2/auth';
import { DataServiceService } from '../shared/data-service.service';
import { Router } from '@angular/router';
import { Reviewer } from '../reviewer';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  content: string;
  rating: number;
  review: Review;
  reviewer: Reviewer;
  uid: string;
  @Input() movieID: string;
  @Input() movieName: string;

  constructor(public afa: AngularFireAuth, private data: DataServiceService, private route: Router) {
    this.reviewer = new Reviewer;
    this.review = new Review;
    this.afa.authState.subscribe((resp) => {
      if (resp != null) {
        if (resp.uid) {
          this.uid = resp.uid;
          this.getReviewer();
        }
      }
      else {
        this.route.navigate(['login']); //if they're not logged in, they're directed back to login
      }
    });
  }

  private getReviewer() {
    this.data.getUser(this.uid).subscribe(value => {
      this.reviewer = value;
    });
  }

  createReview(content, rating) {
    this.review.AuthorName = this.reviewer.Name;
    console.log(this.reviewer.Name);
    this.review.Content = content;
    this.review.MovieID = this.movieID;
    this.review.Score = rating;
    this.review.MovieName = this.movieName;
    this.reviewer.Reviews.push(this.review); //adds the new review to the array, then patches the array
    this.data.createReview(this.formatPost(), this.uid, this.movieID);

  }

  formatPost(): any {
    return {
      "Reviews": this.reviewer.Reviews
    }
  }

  ngOnInit() {
  }

}
