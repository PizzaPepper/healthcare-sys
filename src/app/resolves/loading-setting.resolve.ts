import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { PersonService } from '../services/person.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingSettingResolve implements Resolve<any>{
  
  constructor(private _person:PersonService) {
   }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._person.getPerson();
  }
}
