import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { UrlResolver } from '../../environments/UrlResolver';
import { DefaultImageType } from 'src/environments/enums.helper';
import { MatDialog } from '@angular/material/dialog';
import { ProfileModalBoxComponent } from '../profile/profile_modal_box/profileModalBox.component';
import { Router } from '@angular/router';
import { ProfileCardType } from '../services/authentication/User';

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
        let imageGuid = this.authService.profilePicture;
        return UrlResolver.GeImageUrl(imageGuid, DefaultImageType.ProfilePictire);
    }
    constructor(private authService: AuthenticationService, private dialog: MatDialog, private router: Router){

    }
    public clearLoginData(): void{
        this.authService.logout();
    }
    public showProfile(): void{
        this.dialog.open(ProfileModalBoxComponent, {
            data: {
                profileId: this.authService.loginName,
                profileCardType: ProfileCardType.MyProfile,
            },
        });
    }
    public goToContacts(): void{
        this.router.navigateByUrl('/contacts');
    }
    public goToChats(): void{
        this.router.navigateByUrl('/');
    }
}