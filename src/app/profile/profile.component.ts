import { Router } from '@angular/router';
import { DataServiceService } from '../shared/data-service.service';
import { Reviewer } from '../reviewer';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Review } from '../review';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentReviewer: any;
  reviews: any[];
  uid: string;
  constructor(private service: DataServiceService, private router: Router, public afa: AngularFireAuth, private data: DataServiceService) {
    /* Had to repeat this code here because the constructor in the service
     * doesn't fire fast enough, so it wouldn't return the user.
     */
    this.afa.authState.subscribe((resp) => {
      if (resp != null) {
        if (resp.uid) {
          this.uid = resp.uid;
          this.getReviewer();
        }
      }
      else {
        this.router.navigate(['login']);
      }
    });
    this.currentReviewer = new Observable<any>();

  }

  private getReviewer() {
    this.service.getUser(this.uid).subscribe(value => {
      this.currentReviewer = value,
        console.log(this.currentReviewer);
    });
  }

  getReviews(id) {
    this.data.getReviewsForProfile(id).subscribe(res => {
      console.log(res);
      this.reviews = res;
    });
  }

  editProfile() {
    this.router.navigate(['editprofile']);
  }

  ngOnInit() {

  }

}
