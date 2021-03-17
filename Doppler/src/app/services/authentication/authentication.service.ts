import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from './User';
import { UrlResolver } from '../../../environments/UrlResolver';
import { IStaticRepository, StaticRepository } from '../../../repository/static.repository';
import { AuthModel } from './AuthModel';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private staticRepository: IStaticRepository = new StaticRepository();
    constructor(private http: HttpClient){

    }
    public login(UserName: string, Password: string): void{
        if(UserName && Password){
            this.http.post(UrlResolver.GetLoginUrl(), {
                'UserName': UserName,
                'Password': Password
            }).subscribe(authResult => {
                if(authResult){
                    this.staticRepository.saveLoginData(authResult as AuthModel);
                }
            });
        }
    }
}
