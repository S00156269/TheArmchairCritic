import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { imdbService } from '../app/shared/imdb.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FilmsComponent } from './films/films.component';
import { ListComponent } from './list/list.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './shared/auth.service';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { DataServiceService } from './shared/data-service.service';
import { ReviewComponent } from './review/review.component';
import { SinglefilmComponent } from './singlefilm/singlefilm.component';
import { StarRatingComponent } from './star-rating/star-rating.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'search', component: SearchComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'editprofile', component: EditprofileComponent},
  { path: '', component: FilmsComponent},
  { path: 'popularFilm', component: FilmsComponent},
  { path: 'review', component: ReviewComponent},  
  //temp
  { path: 'single', component: SinglefilmComponent},
  { path: 'search', component: SearchComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    FilmsComponent,
    ListComponent,
    SearchComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    EditprofileComponent,
    ReviewComponent,
    SinglefilmComponent,
    StarRatingComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireDatabaseModule
    ],
  providers: [AuthService, AngularFireAuth, imdbService, AngularFireDatabase, DataServiceService],

  bootstrap: [AppComponent]
})
export class AppModule { 
}
