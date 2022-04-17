import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { delay, forkJoin, from,map,of } from 'rxjs';
import { PersonService } from '../services/person.service';

@Injectable({
  providedIn: 'root',
})
export class QuerySettingService implements Resolve<any> {
  constructor(private _person: PersonService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return forkJoin(
    //   this._person.getPerson(),
    //   this._person.getPatients()
    // ).pipe(
    //   map(([first, second]) => {
    //     return { first, second };
    //   })
    // );
    
    return this._person.getPerson();
  }
}
