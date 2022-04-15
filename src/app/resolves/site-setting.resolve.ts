import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { PersonService } from '../services/person.service';

@Injectable({
  providedIn: 'root'
})
export class SiteSettingService implements Resolve<any>{
  
  constructor(private _person:PersonService) {
   }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentPage = route.routeConfig?.path;

    switch(currentPage){
      case 'loading': return this._person.getPerson();
      case 'query': return this._person.getPerson();
      default: return null; 
    }
  }
}
