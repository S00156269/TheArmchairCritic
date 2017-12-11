import { Component, OnInit } from '@angular/core';
import { Review } from '../review';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  content: string;
  rating: number;
  review: Review;

  constructor(public afa: AngularFireAuth) { 
    
  }

  createReview(){

  }

  ngOnInit() {
  }

}
