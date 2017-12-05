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
  success: boolean;
  constructor(public authService: AuthService) { }

  login() {
    if(this.authService.login(this.email, this.password)){
      this.email = this.password = '';
      this.success = true;
    }
    else{
      this.success = false;
    }
  }

  logout() {
    this.authService.logout();
  }

}
