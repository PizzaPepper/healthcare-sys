import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private authService:AuthService
  ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenizeReq: HttpRequest<any> = req.clone({
      setHeaders: {
        Authorization: `${this.authService.getToken()}`,
        authorizationsession:`${this.authService.getTokenExp()}`
      }
    });
    return next.handle(tokenizeReq);
  }
}
