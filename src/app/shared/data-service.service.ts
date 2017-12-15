import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Reviewer } from '../reviewer';
import { BehaviorSubject } from 'rxjs';
import { Review } from '../review';

@Injectable()
export class DataServiceService {
    /**
     * gets UID of logged-in user (doesn't fire back fast enough sometimes :(  )
     */
    iuid: string;
    constructor(private http: HttpClient, private afa: AngularFireAuth) {
        this.afa.authState.subscribe((resp) => {
            if (resp != null) {
                if (resp.uid) {
                    this.iuid = resp.uid;
                }
            }
        });
    }
    /**
     * Requests for user, creating user, creating reviews and getting reviews. HTTP requests > firebase methods
     */
    createUser(data) {
        this.http.patch('https://armchaircritic-c8e75.firebaseio.com/users/' + this.iuid + ".json", data).subscribe(res => { console.log(res) });
    }
    getUser(uid): Observable<any> {
        return this.http.get('https://armchaircritic-c8e75.firebaseio.com/users/' + uid + ".json");
    }
    createReview(data, uid, filmID) {
        this.http.patch('https://armchaircritic-c8e75.firebaseio.com/users/' + uid + ".json", data).subscribe(res => { console.log(res) });
        this.http.patch('https://armchaircritic-c8e75.firebaseio.com/films/' + filmID + ".json", data).subscribe(res => { console.log(res) });
    }
    getReviewsForFilm(filmID): Observable<any> {
        return this.http.get('https://armchaircritic-c8e75.firebaseio.com/films/' + filmID + "/Reviews" + ".json");
    }
    getReviewsForProfile(userID): Observable<any> {
        return this.http.get('https://armchaircritic-c8e75.firebaseio.com/user/' + userID + "/Reviews" + ".json");
    }
}
