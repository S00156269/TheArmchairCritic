import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Reviewer } from '../reviewer';

@Injectable()
export class DataServiceService {
    uid: string;
    constructor(private http: HttpClient, private afa: AngularFireAuth) {
        this.afa.authState.subscribe((resp) => {
            if (resp != null) {
                if (resp.uid) {
                    this.uid = resp.uid;
                }
            }
        });
    }

    createUser(data) {
        this.http.patch('https://armchaircritic-c8e75.firebaseio.com/users/' + this.uid + ".json", data).subscribe(res => { console.log(res) });
    }
    getUser() :Observable<any>{
        return this.http.get('https://armchaircritic-c8e75.firebaseio.com/users/' + this.uid + ".json");
    }
}
