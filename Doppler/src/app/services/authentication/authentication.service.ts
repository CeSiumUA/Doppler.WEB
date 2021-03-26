import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from './User';
import { UrlResolver } from '../../../environments/UrlResolver';
import { IStaticRepository, StaticRepository } from '../../../repository/static.repository';
import { AuthModel } from './AuthModel';
import { map } from 'rxjs/operators';
import { from, Observable, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private staticRepository: IStaticRepository = new StaticRepository();
    constructor(private http: HttpClient){

    }
    public login(UserName: string, Password: string): Observable<object|string>{
        if (UserName && Password){
            return this.http.post(UrlResolver.GetLoginUrl(), {
                'UserName': UserName,
                'Password': Password
            }).pipe(map(authResult => {
                if (authResult){
                    this.staticRepository.saveLoginData(authResult as AuthModel);
                }
                else{
                    throw new Error('invalidCredentials');
                }
                return authResult;
            }));
        }
        return of('Credentials are empty!').pipe(map(x => {
            throw new Error('Credentials are empty!');
        }));
    }
    public checkAuth(): boolean{
        const authModel = this.getAuthModel();
        if (authModel){
            return true;
        }
        return false;
    }
    private getAuthModel(): AuthModel | null{
        return this.staticRepository.getLoginData();
    }
    public get userName(): string | undefined {
        return this.getAuthModel()?.user.name;
    }
    public get phoneNumber(): string | undefined {
        return this.getAuthModel()?.user.phoneNumber;
    }
    public get profilePicture(): string | undefined {
        return this.getAuthModel()?.user.iconUrl;
    }
}
