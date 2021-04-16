import { Component, Inject, OnInit, Pipe } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HubService } from '../../services/communication/hub.service';
import { UrlResolver } from '../../../environments/UrlResolver';
import { DefaultImageType } from "src/environments/enums.helper";
import { ProfileCardType } from '../../services/authentication/User';
import { SecurePipe } from '../../services/communication/secure.pipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileUploadType } from '../../../models/file.uploadtype';


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
    public likes: string | number = 0;
    public isLiked: boolean = false;
    public likesLoading = true;
    public showOverlay = false;
    private activeOverlayPhoto: string = '';
    public imageCollection: any[] = [];
    constructor(@Inject(MAT_DIALOG_DATA) public profileSettings: any, private hubService: HubService, private httpClient: HttpClient){
    }
    public get image(): string{
        return UrlResolver.GetImageUrl(this.imageUrl, DefaultImageType.ProfilePictire);
    }
    public get urlImage(): string{
        //return `url('${this.image}')`;
        return this.image;
    }
    public set urlImage(value: string){

    }
    public async addToContacts(): Promise<void>{
        await this.hubService.addToContacts(this.profileSettings.profileId)
                .then(x => x);
    }
    public async startChatting(): Promise<void>{

    }
    public get ActiveOverlayPhoto(): string{
        return UrlResolver.GetImageUrl(this.activeOverlayPhoto, DefaultImageType.ProfilePictire);
    }
    public async scaleImage(): Promise<void>{
        this.showOverlay = true;
    }
    public async hideImage(): Promise<void>{
        this.showOverlay = false;
    }
    public async likeProfile(): Promise<void>{
        this.likesLoading = true;
        return await this.hubService.RateProfile(this.profileSettings.profileId, !this.isLiked)
            .then(result => {
                this.likes = result.likes,
                this.isLiked = result.isLiked;
                this.likesLoading = false;
            });
    }
    public async setActivePhoto(files: FileList | null): Promise<void>{
        if(files !== null){
            const firstFile = files.item(0);
            if(firstFile != null){
                const endpoint = UrlResolver.GetFileUploadUrl();
                const formData = new FormData();
                formData.append('files', firstFile, firstFile.name);
                formData.append('uploadType', FileUploadType.ProfileImage.toString());
                this.httpClient
                    .post(endpoint, formData)
                    .subscribe(result => {
                        this.imageUrl = result.toString();
                    });
            }
        }
    }
    public get profileCardType(): typeof ProfileCardType{
        return ProfileCardType;
    }
    ngOnInit(): void{
        this.loading = true;
        if (this.profileSettings.profileCardType === ProfileCardType.MyContactProfile){
            this.hubService.getContact(this.profileSettings.profileId)
                .then(response => {
                    this.name = response.displayName;
                    this.phoneNumber = response.contact.phoneNumber;
                    this.imageUrl = response.contact.iconUrl;
                    this.loading = false;
                    this.description = response.contact.description;
                    this.likes = response.contact.likes;
                    this.imageCollection = response.contact.userIcons;
                    this.activeOverlayPhoto = this.imageCollection.filter(x => x.isActive)[0].url;
                    if(this.likes === 0){
                        this.likes = 'LIKE';
                    }
                });
        }
        else {
            this.hubService.getUser(this.profileSettings.profileId)
                .then(response => {
                    this.name = response.name;
                    this.phoneNumber = response.phoneNumber;
                    this.imageUrl = response.iconUrl;
                    this.loading = false;
                    this.description = response.description;
                    this.likes = response.likes;
                    this.imageCollection = response.userIcons;
                    this.activeOverlayPhoto = this.imageCollection.filter(x => x.isActive)[0].url;
                });
        }
        this.hubService.CheckUserForLike(this.profileSettings.profileId)
            .then(result => {
                this.isLiked = result;
                this.likesLoading = false;
            });
    }
}