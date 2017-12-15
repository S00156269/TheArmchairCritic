import { Router } from '@angular/router';
import { DataServiceService } from '../shared/data-service.service';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import { Reviewer } from '../reviewer';
import { imdbService } from '../shared/imdb.service';
import { IShows } from '../shared/iShows';
import { AngularFireDatabase } from 'angularfire2/database';
import { Review } from '../review';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})

export class EditprofileComponent implements OnInit {
  /**
   * Updates the user (even if there isn't one)
   */
  form: FormGroup;
  filteredMovies: string[];
  currentReviewer: Reviewer;
  success: boolean;
  availableGenres: string[];
  shows: IShows[];
  filteredShows: IShows[];
  errorMessage: any;
  uid: string;
  constructor(public authService: AuthService, public afa: AngularFireAuth, private _iMDBService: imdbService, private db: AngularFireDatabase, private data: DataServiceService, private router: Router) {
    this.availableGenres = ["Horror", "Action", "Sci-Fi", "Thriller", "Comedy"];
    this.success = true;
    this.currentReviewer = new Reviewer;
    this.currentReviewer.FaveMovies = [];
    this.currentReviewer.FaveGenres = [];
    /* Had to repeat this code here because the constructor in the service
 * doesn't fire fast enough, so it wouldn't return the user.
 */
    this.afa.authState.subscribe((resp) => {
      if (resp != null) {
        if (resp.uid) {
          this.uid = resp.uid;
          this.populateFields();
        }
      }
      else {
        this.router.navigate(['login']);
      }
    });
  }
  populateFields() {
    //in case the user wants to edit already existing stuff
    this.data.getUser(this.uid).subscribe(value => {
      this.currentReviewer = value;
      if (this.currentReviewer.FaveMovies == undefined)
        this.currentReviewer.FaveMovies = [];
      if (this.currentReviewer.FaveMovies == undefined)
        this.currentReviewer.FaveMovies = [];
      console.log(this.currentReviewer);
    });
  }
  getName() {
    //gets details
    if (this.currentReviewer) {
      return this.currentReviewer.Name;
    }
    else {
      return "Name";
    }
  }

  getBio() {
    if (this.currentReviewer) {
      return this.currentReviewer.Bio;
    }
    else {
      return "Name";
    }
  }

  checkGenres(value) {
    if (this.currentReviewer) {
      if (this.currentReviewer.FaveGenres.includes(value)) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }

  createUserProfile(name, bio) {
    this.currentReviewer.Name = name;
    this.currentReviewer.Bio = bio;
    this.currentReviewer.FaveMovies = this.currentReviewer.FaveMovies;
    console.log(this.currentReviewer);
    this.data.createUser(this.formatPost(this.currentReviewer)); //sends it off to the service
    this.populateFields();
    this.router.navigate(['profile']);
  }

  formatPost(user: Reviewer): any {
    return {
      "Name": user.Name,
      "Bio": user.Bio,
      "FaveGenres": user.FaveGenres,
      "FaveMovies": user.FaveMovies,
      "Reviews": user.Reviews
    }
  }

  addFaveFilm(title) {
    if (!this.currentReviewer.FaveMovies.includes(title)) {
      this.currentReviewer.FaveMovies.push(title);
      console.log(this.currentReviewer.FaveMovies);
    }
  }

  removeFaveMovie(title: any) {
    this.currentReviewer.FaveMovies.splice(this.currentReviewer.FaveMovies.indexOf(title), 1);
  }

  deleteReview(review) {
    this.currentReviewer.Reviews.splice(this.currentReviewer.Reviews.indexOf(review), 1)
    console.log(this.currentReviewer);
  }

  getGenres(genre: string) {
    if (!this.currentReviewer.FaveGenres.includes(genre)) {
      this.currentReviewer.FaveGenres.push(genre);
      console.log(this.currentReviewer.FaveGenres);
    }
    else {
      this.currentReviewer.FaveGenres.splice(this.currentReviewer.FaveGenres.indexOf(genre), 1);
      console.log(this.currentReviewer.FaveGenres);
    }
  }
  //uses the movie service to show films to the user so they can add them to their profile
  public search(searchTerm) {
    this.shows = [];
    this.filteredShows = [];
    if (searchTerm != "") {
      this._iMDBService.searchMDBMovie(searchTerm).subscribe(shows => {
        this.shows = shows.results,
          this.filteredShows = this.shows
      },
        error => this.errorMessage = <any>error);
    }
  }

  public ngOnInit(): void {

  }

}