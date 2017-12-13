import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { DataServiceService } from './shared/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Armchair Critic';
  constructor(public afa: AuthService, public data: DataServiceService){
    
  }
  logout() {
    this.afa.logout();
  }
}