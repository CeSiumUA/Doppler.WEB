import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent{
    public get userName(): string | undefined{
        return this.authService.userName;
    }
    public get phoneNumber(): string | undefined{
        return this.authService.phoneNumber;
    }
    public get iconUrl(): string{
        return (this.authService.profilePicture) ? this.authService.profilePicture : 'assets/icons/profile_picture.png';
    }
    constructor(private authService: AuthenticationService){

    }
    public clearLoginData(): void{
        this.authService.logout();
    }
}