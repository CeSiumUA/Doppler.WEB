import { Component, OnInit } from '@angular/core';
import { User } from '../services/authentication/User';
import { HubService } from '../services/communication/hub.service';
import { UrlResolver } from '../../environments/UrlResolver';
import { DefaultImageType } from '../../environments/enums.helper';
import { MatDialog } from '@angular/material/dialog';
import { ProfileModalBoxComponent } from '../profile/profile_modal_box/profileModalBox.component';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit{
    public contactsGridTitle = 'My Contacts';
    public searchModeEnabled = false;
    public searchPattern = '';
    public searchResults: User[] = [];
    constructor(private hubService: HubService, private dialog: MatDialog){

    }
    public changeHeaderTitle(): void{
        this.contactsGridTitle = (this.searchModeEnabled === false) ? 'Search result' : 'My Contacts';
        this.searchModeEnabled = !this.searchModeEnabled;
    }
    public async searchUser(): Promise<void>{
        if (this.searchPattern.length > 0){
            await this.hubService.SearchUser(this.searchPattern)
                .then(response => {
                    this.searchResults = response;
                });
        }
        else{
            this.searchResults = [];
        }
    }
    public getImage(value: string, imageType: DefaultImageType = DefaultImageType.ProfilePictire): string{
        return UrlResolver.GeImageUrl(value, imageType);
    }
    public showProfile(profileId: string): void{
        this.dialog.open(ProfileModalBoxComponent, {
            data: profileId,
        });
    }
    ngOnInit(): void{

    }
}
