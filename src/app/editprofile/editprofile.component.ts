import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Reviewer } from '../reviewer';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  currentReviewer: Reviewer;
  constructor(public authService: AuthService, public afa: AngularFireAuth) { 
    this.GetUID();
  }

  GetUID() {
    this.afa.authState.subscribe((resp) => {
      if (resp != null) {
        if (resp.uid) {
          this.currentReviewer.UID = resp.uid;
        }
      }
    })
  }

  ngOnInit() {
  }

}
