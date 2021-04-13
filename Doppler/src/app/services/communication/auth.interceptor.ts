import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable, from } from 'rxjs';
import { switchMap } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(!req.headers.has('Authorization')){
            return from(this.authService.getAccessToken())
                .pipe(
                    switchMap(token => {
                        const headers = req.headers.set('Authorization', 'Bearer ' + token)
                            .append('Content-Type', 'application/json');
                        const requestClone = req.clone({headers: headers});
                        return next.handle(requestClone);
                    })
                )
        }
        return next.handle(req);
    }
}