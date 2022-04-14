import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import User from '../models/User';
import { Global } from './global';


@Injectable({
  providedIn:'root'
})
export class AuthService {
  public url!: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url + 'users/';
  }

  signIn(user: User): Observable<any> {
    const params = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'signin', params, {
      headers: headers,
    });
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
