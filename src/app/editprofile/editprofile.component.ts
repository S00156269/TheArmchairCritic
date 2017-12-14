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

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})

export class EditprofileComponent implements OnInit {
  form: FormGroup;
  filteredMovies: string[];
  currentReviewer: Reviewer;
  success: boolean;
  faveGenres: string[] = [];
  faveMovies: string[] = [];
  availableGenres: string[];
  shows: IShows[];
  filteredShows: IShows[];
  errorMessage: any;
  
  constructor(public authService: AuthService, public afa: AngularFireAuth, private _iMDBService: imdbService, private db: AngularFireDatabase, private data: DataServiceService, private router: Router) {
    this.availableGenres = ["Horror", "Action", "Sci-Fi", "Thriller", "Comedy"];
    this.success = true;
    this.currentReviewer = new Reviewer;
  }

  createUserProfile(name, bio) {
    if (name != null && name != "" && bio != null && bio != "") {
      this.currentReviewer.Name = name;
      this.currentReviewer.Bio = bio;
      this.currentReviewer.FaveGenres = this.faveGenres;
      this.currentReviewer.FaveMovies = this.faveMovies;
      console.log(this.currentReviewer);
      this.data.createUser(this.formatPost(this.currentReviewer));
      this.router.navigate(['profile']);
      }
    else {
      this.success = false;
    }
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
    if (!this.faveMovies.includes(title)) {
      this.faveMovies.push(title);
      console.log(this.faveMovies);
    }
  }

  removeFaveMovie(title: any) {
    this.faveMovies.splice(this.faveMovies.indexOf(title), 1);
    console.log(this.faveMovies);
  }

  getGenres(genre: string) {
    if (!this.faveGenres.includes(genre)) {
      this.faveGenres.push(genre);
      console.log(this.faveGenres);
    }
    else {
      this.faveGenres.splice(this.faveGenres.indexOf(genre), 1);
      console.log(this.faveGenres);
    }
  }

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