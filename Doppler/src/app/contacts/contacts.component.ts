import { Component, OnInit } from '@angular/core';
import { ProfileCardType, User, UserContact } from '../services/authentication/User';
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
    public searchGridTitle = 'Search result';
    public searchModeEnabled = false;
    public searchPattern = '';
    public searchResults: User[] = [];
    public userContacts: UserContact[] = [];
    constructor(private hubService: HubService, private dialog: MatDialog){

    }
    public async searchUser(): Promise<void>{
        if (this.searchPattern.length > 0){
            this.searchModeEnabled = true;
            await this.hubService.SearchUser(this.searchPattern)
                .then(response => {
                    this.searchResults = response;
                });
        }
        else{
            this.searchModeEnabled = false;
            this.searchResults = [];
        }
    }
    public async getUserContacts(): Promise<void>{
        return await this.hubService.GetUserContacts()
            .then(result => {
                this.userContacts = result;
        });
    }
    public getImage(value: string, imageType: DefaultImageType = DefaultImageType.ProfilePictire): string{
        return UrlResolver.GeImageUrl(value, imageType);
    }
    public get profileCardType(): typeof ProfileCardType{
        return ProfileCardType;
    }
    public showProfile(profileId: string, profileCardType: ProfileCardType): void{
        this.dialog.open(ProfileModalBoxComponent, {
            data: {
                profileId,
                profileCardType
            },
        });
    }
    async ngOnInit(): Promise<void>{
        await this.getUserContacts();
    }
}
