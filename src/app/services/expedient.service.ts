import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ExpedientService {
  private url!:string;

  constructor(private _http: HttpClient) { 
    this.url = Global.url+'exp/';
  }

  getExpedient(id:string){
    return this._http.get(this.url+id);
  }

  uploadFile(id:string,form:FormData){
    return this._http.post(this.url+id+'/upload',form);
  }
}
