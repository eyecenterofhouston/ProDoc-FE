import { Injectable ,Injector} from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router} from '@angular/router';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    constructor(private injector: Injector, private router:Router) {}
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    var token=  localStorage.getItem("token");
    var Authorization = ""
    if(token!=undefined && token!=null){
        Authorization = "Bearer "+token;
    }
    return next.handle(httpRequest.clone({ setHeaders: { Authorization } })).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                //console.log('event--->>>', event);
            }
            return event;
        }),
        catchError((error: HttpErrorResponse) => {
            console.log(error.error)
            if(error.error.error=="Unauthorized"){
                localStorage.clear()
                this.router.navigate(['/login']);
            }
            return throwError(error);
        }));
  }
}