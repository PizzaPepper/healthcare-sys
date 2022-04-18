import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, forkJoin, map } from 'rxjs';
import { ExpedientService } from '../services/expedient.service';
import { PersonService } from '../services/person.service';
@Injectable({
  providedIn: 'root'
})
export class ExpSettingResolve implements Resolve<any> {

  constructor(
    private _expedientService:ExpedientService, 
    private _personService:PersonService,
    private _router:Router
    ) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const idExp =route.paramMap.get('id');

    

    return forkJoin(
      this._personService.getPerson(),
      this._expedientService.getExpedient(idExp!)
    ).pipe(
      map(([first, second]) => {
        
        return { first, second };
      })
      ,catchError(error => {
        this._router.navigate(['/error']);
        return error;
      })
    )
  }
  
}
