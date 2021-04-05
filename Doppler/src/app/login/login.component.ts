import { Component, Input } from "@angular/core";
import { logging } from 'protractor';
import { of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { AuthenticationService } from '../services/authentication/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HubService } from '../services/communication/hub.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent{
    public loggingIn = false;
    public UserName: string = '';
    public Password: string = '';
    @Input() nextUrl: string = '';
    constructor(private authService: AuthenticationService, private snackBar: MatSnackBar, private router: Router, private hubService: HubService){

    }
    public login(): void{
        this.loggingIn = true;
        this.authService.login(this.UserName, this.Password).pipe(map(x => {
            this.loggingIn = false;
        }), catchError(x => {
            this.loggingIn = false;
            this.showError(x.message);
            return of('');
        })).subscribe(async next => {
            await this.hubService.startConnection();
            await this.router.navigateByUrl('/');
        }, error => {
            this.showError(error.message);
        });
    }
    private showError(errorText: string): void{
        this.snackBar.open(errorText, 'Dismiss', {
            duration: 10000,
        });
    }
}
