import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

var url = 'http://localhost:3000/';

@Injectable()
export class MovesService {

  static get parameters() {
  	return [[Http]];
  }

  constructor(public http: Http) {
    console.log('Hello MovesService Provider');
  }

  getMoves() {
    console.log('Getting Moves');
  	var response = this.http.get(url).map(res => res.json());
  	return response;
  }

  makeMove(move) {
    console.log('Making Move');
    console.log(move);

    let body = JSON.stringify(move);
    console.log(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    var response = this.http.post(url, body, options).map(res => res.json());
    return response;
  }

  deleteMove(move) {
    console.log('Deleting move');
    console.log(move);
    let url = 'http://localhost:3000' + '/moves/' + move._id;
    var response = this.http.delete(url).map(res => res.json());
    this.getMoves();
    return response;
  }
}