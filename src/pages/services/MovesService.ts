import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
  	var url = 'http://localhost:3000/';
  	var response = this.http.get(url).map(res => res.json());
  	return response;
  }
}