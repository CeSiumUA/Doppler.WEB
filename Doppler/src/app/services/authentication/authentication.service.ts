import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from './User';
import { UrlResolver } from '../../../environments/UrlResolver';
import { IStaticRepository, StaticRepository } from '../../../repository/static.repository';
import { AuthModel } from './AuthModel';
import { map, catchError } from 'rxjs/operators';
import { from, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private staticRepository: IStaticRepository = new StaticRepository();
    constructor(private http: HttpClient, private router: Router){

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
    public logout(): void{
        this.staticRepository.clearLoginData();
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
    public async getAccessToken(): Promise<string>{
        let authModel = this.getAuthModel();
        if(authModel){
            const expireTime = (new Date(authModel.accessToken.expireDate)).getTime();
            const issuedTime = (new Date(authModel.accessToken.issueDate)).getTime();
            const currentTime = (new Date()).getTime();
            if(expireTime > (currentTime + 0.2 * (expireTime - issuedTime))){
                return authModel.accessToken.token;
            }
            return await this.getRefreshToken();
        }
        else{
            this.router.navigateByUrl('/login');
            return '';
        }
    }
    public get loginName(): string | undefined{
        return this.getAuthModel()?.user.login;
    }
    private async getRefreshToken(): Promise<string>{
        const headerDictionary = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Authorization': `Bearer ${this.getAuthModel()?.accessToken.token}`,
            'RefreshToken': `${this.getAuthModel()?.refreshToken.token}`
        }
        const refreshTokenUrl = UrlResolver.GetRefreshTokenUrl();
        return this.http.post(refreshTokenUrl, {}, {
            headers: new HttpHeaders(headerDictionary),
        }).pipe(map(authResult => {
            if (authResult){
                this.staticRepository.saveLoginData(authResult as AuthModel);
            }
            else{
                this.router.navigateByUrl('/login');
            }
            return (authResult as AuthModel).accessToken.token;
        }), catchError(error => {
            this.router.navigateByUrl('/login');
            return of("Unauthorized");
        })).toPromise();
    }
}
