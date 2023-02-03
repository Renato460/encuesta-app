import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private toastr: ToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error) => {
        if(error instanceof HttpErrorResponse){
          if(error.error instanceof ErrorEvent){

          }else {
            switch (error.status){
              case 404:
                this.toastr.error(error.error.message)
                break;
              case 409:
                this.toastr.error(error.error.message)
                break;
            }
          }
        }else {console.log(error)}
        return throwError(()=> new Error(error.statusText))
      })
    );
  }
}
