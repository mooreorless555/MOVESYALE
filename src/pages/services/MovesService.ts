import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

var url = 'http://54.175.164.247:80/';

@Injectable()
export class MovesService {

  static get parameters() {
    return [[Http]];
  }

  constructor(public http: Http) {
    console.log('Hello MovesService Provider');
  }

  getMoves(token) {

    var headers = new Headers({ 'Authorization': token.token });

    return new Promise((resolve, reject) => {
      
      this.http.get(url, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        //alert(data);
        resolve(data);

      }, (err) => {
        //alert(err);
        reject(err);
      
      });
    
    });

  }

  makeMove(move) {
    console.log('Making Move');
    console.log(move);

    let body = JSON.stringify(move);
    console.log(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {

      this.http.post(url, body, options).subscribe(res => {

        let data = res.json();
        resolve(data);

      }, (err) => {

        reject(err);

      });

    });
  }

  deleteMove(move) {
    
    console.log('Deleting move');
    console.log(move);
    let urlDelete = url + 'moves/' + move._id;

    return new Promise((resolve, reject) => {

      this.http.delete(urlDelete)
      .subscribe(res => {

        let data = res.json();
        resolve(data);

      }, (err) => {

        reject(err);

      });

    });
  }
}