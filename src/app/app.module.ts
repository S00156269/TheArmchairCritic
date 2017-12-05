import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FilmsComponent } from './films/films.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { SearchComponent } from './search/search.component';
import { ReviewersComponent } from './reviewers/reviewers.component';


@NgModule({
  declarations: [
    AppComponent,
    FilmsComponent,
    ListComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EditprofileComponent,
    SearchComponent,
    ReviewersComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
