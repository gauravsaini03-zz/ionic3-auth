import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';
// import {Observable} from 'rxjs/Observable';

@Injectable()
export class HttpClient {
  
  constructor(public http: Http, public storage: Storage) {}

  buildHeaders(){
    let headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    })

    return this.storage.get("user").then(
      (u) => {
        if(u){
          headers.append('Authorization', u.id);
          return headers;
        }
      }
    )
  }

  get(url) {
    return Observable
        .fromPromise(this.buildHeaders())
        .switchMap((headers) => this.http.get(url, { headers: headers }));
  }

  post(url, data) {
    return Observable
        .fromPromise(this.buildHeaders())
        .switchMap((headers) => this.http.post(url, data, { headers: headers }));
  }  
}