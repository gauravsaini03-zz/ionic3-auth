import { Injectable } from '@angular/core';
import { HttpClient } from './http-client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';
import { API_URL } from './constants';

@Injectable()
export class DataService {

  constructor(public http: HttpClient, public storage: Storage) {
    console.log("=========provider====constructor====")
  }

  login(data): Observable<any> {
    return this.http.post(API_URL + '/users/login', data).map(res => res.json());
  }

  getArticles(): Observable<any> {
    return this.http.get(API_URL + '/articles?filter[limit]=10').map(res => res.json());
  }

  isAuthorised(): Promise<any> {
    return this.storage.get("user").then((val) => {
      console.log(val)
      if(val) {
         //resolve(true);
         return true;
      }
    })
  }
}
