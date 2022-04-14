import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Person from '../models/Person';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  public url!: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url + 'users/';
  }

  getPerson(): Observable<any> {
    return this._http.get(this.url);
  }

}
