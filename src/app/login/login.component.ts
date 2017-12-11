import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  email: string;
  password: string;
  error: string;

  constructor(public authService: AuthService, private router: Router) {
   }

  login() {
    this.authService.login(this.email, this.password).then(res=>{
      this.router.navigate(['profile']); }   ).catch(err=>{this.error=err})
  }

  logout() {
    this.authService.logout();
  }

}
