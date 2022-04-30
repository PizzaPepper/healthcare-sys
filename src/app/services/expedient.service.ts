import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Global } from './global';

@Injectable({
  providedIn: 'root',
})
export class ExpedientService {
  private url!: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url + 'exp/';
  }

  getExpedient(id: string) {
    return this._http.get(this.url + id);
  }

  uploadFile(id: string, form: FormData) {
    return this._http.post(this.url + id + '/upload', form);
  }

  getStatus(id: string) {
    return this._http.get(this.url + id + '/status');
  }

  putStatus(id: string) {
    return this._http.put(
      this.url + id + '/status',
      {},
      { observe: 'response' }
    );
  }

  // ! @Warning: This method is only for simulation Scan finger, delete it when you have a real system
  putStatusFromPatient(id: string) {
    return this._http.put(
      this.url + id + '/statusAccepted',
      {},
      { observe: 'response'}
    );
  }

  putStatusDefault(id: string) {
    return this._http.put(this.url + id + '/statusDefault', {});
  }
}
