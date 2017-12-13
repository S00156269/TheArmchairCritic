import { Reviewer } from '../reviewer';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class ReviewersService {

  reviewers: FirebaseListObservable<Reviewer[]> = null;
  userId: string;
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid;
    })
  }
    // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getItemsList(): FirebaseListObservable<Reviewer[]> {
    if (!this.userId) return;
    this.reviewers = this.db.list(`users/${this.userId}`);
    return this.reviewers;
  }
  createItem(reviewer: Reviewer)  {
    this.reviewers.update(this.userId, reviewer);
  }
}