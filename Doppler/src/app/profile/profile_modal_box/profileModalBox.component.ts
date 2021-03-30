import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HubService } from '../../services/communication/hub.service';
import { UrlResolver } from '../../../environments/UrlResolver';
import { DefaultImageType } from "src/environments/enums.helper";

@Component({
    selector: 'app-profile-modalbox',
    templateUrl: './profileModalBox.component.html',
    styleUrls: ['./profileModalBox.component.css']
})
export class ProfileModalBoxComponent implements OnInit{
    //TODO Auth Check
    public name: string = '';
    public phoneNumber: string = '';
    public description: string = '';
    private imageUrl: string = '';
    public loading: boolean = false;
    constructor(@Inject(MAT_DIALOG_DATA) public profileUrl: string, private hubService: HubService){
    }
    public get image(): string{
        return UrlResolver.GeImageUrl(this.imageUrl, DefaultImageType.ProfilePictire);
    }
    public get urlImage(): string{
        return `url('${this.image}')`;
    }
    ngOnInit(): void{
        this.loading = true;
        this.hubService.getContact(this.profileUrl)
            .then(response => {
                this.name = response.name,
                this.phoneNumber = response.phoneNumber,
                this.imageUrl = response.iconUrl,
                this.loading = false,
                this.description = response.description
            });
    }
}