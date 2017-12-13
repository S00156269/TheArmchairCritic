import { Router } from '@angular/router';
import { DataServiceService } from '../shared/data-service.service';
import { Reviewer } from '../reviewer';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentReviewer: any;
  user: any;

  constructor(private service: DataServiceService, private router: Router, private afa: AuthService) {
    this.currentReviewer = new Observable<any>();
    this.service.getUser().subscribe(value => {
      this.currentReviewer = value;
      console.log(this.currentReviewer);
      });
  }

  editProfile(){
    this.router.navigate(['editprofile']);    
  }
  
  ngOnInit() {
    
  }

}
