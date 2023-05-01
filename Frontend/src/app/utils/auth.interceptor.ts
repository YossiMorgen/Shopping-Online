import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { tap } from 'rxjs';
import { Router } from "@angular/router";
import { ToastService } from "angular-toastify";
@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService, 
    private router : Router,
    private toast: ToastService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        next: (event : any) => {
          if (event instanceof HttpResponse) {
            if(event.status == 401) {
              this.toast.error('Token expired or unavailable')
              this.auth.logout();
            }
          }
          return event;
        },
        // error: (error : any) => {
        //   if(error.status === 401) {
        //     // alert('Unauthorized access!')
        //     this.auth.logout();
        //   }
        // }
      }));
  }
}
