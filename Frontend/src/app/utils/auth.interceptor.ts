import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { tap } from 'rxjs';
import { Router } from "@angular/router";
@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService, private router : Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        next: (event : any) => {
          if (event instanceof HttpResponse) {
            if(event.status == 401) {
              alert('Unauthorized access!')
              this.auth.logout();
            }
          }
          return event;
        },
        error: (error : any) => {
          if(error.status === 401) {
            // alert('Unauthorized access!')
            this.auth.logout();
          }
          else if(error.status === 404) {
            // alert('Not Found!')
            this.router.navigate(['/products']);
          }
        }
      }));
  }
}
