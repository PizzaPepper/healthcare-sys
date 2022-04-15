import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import User from '../models/User';
import { Global } from './global';

@Injectable({
  providedIn:'root'
})
export class AuthService {
  public url!: string;

  constructor(private _http: HttpClient,private _router:Router) {
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

  logOut() {
    localStorage.clear();
    this._router.navigate(["/login"]);
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
