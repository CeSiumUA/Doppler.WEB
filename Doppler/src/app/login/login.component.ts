import { Component } from "@angular/core";
import { logging } from 'protractor';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent{
    public loggingIn = false;
    public UserName: string = '';
    public Password: string = '';
    constructor(private authService: AuthenticationService){

    }
    public login(): void{
        this.loggingIn = true;
        this.authService.login(this.UserName, this.Password);
    }
}