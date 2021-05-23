import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { stat } from 'fs';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { HubService } from '../communication/hub.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private router: Router, private hubService: HubService){
    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean | Promise<boolean|UrlTree> {
        if(this.authService.checkAuth()){
            return this.hubService.startConnection();
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}