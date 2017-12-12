import { Router } from '@angular/router';
import { DataServiceService } from '../shared/data-service.service';
import { Reviewer } from '../reviewer';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentReviewer: any;

  constructor(private service: DataServiceService, private router: Router, public afa: AngularFireAuth) {
    var user = this.afa.auth.currentUser;
    if (!user) {
      this.router.navigate(['login']);    
    }
    this.currentReviewer = new Observable<any>();
    this.service.getUser().subscribe(value => {
    this.currentReviewer = value,
    console.log(this.currentReviewer);
    });
  }

  editProfile(){
    this.router.navigate(['editprofile']);    
  }
  
  ngOnInit() {
    
  }

}
