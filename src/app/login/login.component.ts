import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;
  error: string;

  constructor(public authService: AuthService, private router: Router, public afa: AngularFireAuth) {

  }
  //uses authservice service to log in (it depends on the angular fireauth)
  login() {
    this.authService.login(this.email, this.password).then(res => {
      this.router.navigate(['profile']);
    }).catch(err => { this.error = err })
  }

  logout() {
    this.authService.logout();
  }

}
