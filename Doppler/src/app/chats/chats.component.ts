import { Component, OnInit } from '@angular/core';
import { HubService } from '../services/communication/hub.service';
import { Conversation } from '../../models/Conversation';
import { UrlResolver } from '../../environments/UrlResolver';
import { DefaultImageType } from 'src/environments/enums.helper';
import { Router } from '@angular/router';

@Component({
    selector: 'app-chats',
    templateUrl: './chats.component.html',
    styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit{
    public chats: Conversation[] = [];
    constructor(private hubService: HubService, private router: Router){
        
    }
    public goToProfile(chat: Conversation){
        this.router.navigateByUrl(`/chat/${chat.id}`);
    }
    public getImageURL(url: string): string{
        return UrlResolver.GetImageUrl(url, DefaultImageType.ChatPicture)
    }
    async ngOnInit(): Promise<void>{
        await this.hubService.GetUserConversations()
            .then(conversations => {
                this.chats = conversations;
            })
    }
}