import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from './User';
import { UrlResolver } from '../../../environments/UrlResolver';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    constructor(private http: HttpClient){

    }
    public login(UserName: string, Password: string): void{
        if(UserName && Password){
            this.http.post(UrlResolver.GetLoginUrl(), {
                "UserName": UserName,
                "Password": Password
            }).subscribe(authResult => {
                console.log(authResult);
            });
        }
    }
}
