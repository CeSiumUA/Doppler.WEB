import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HubService } from '../services/communication/hub.service';
import { ConversationMessage } from '../../models/Message';
import { ComponentsService } from '../services/utils/components.service';
import { Conversation } from '../../models/Conversation';
import { UrlResolver } from '../../environments/UrlResolver';
import { DefaultImageType } from 'src/environments/enums.helper';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
    public messages: ConversationMessage[] = [];
    public newMessage: string = '';
    constructor(private hubService: HubService, private activateRoute: ActivatedRoute, private componentsService: ComponentsService){
        
    }
    public get profileImageUrl(): string{
        return UrlResolver.GetImageUrl(this.selectedConversation?.iconUrl, DefaultImageType.ProfilePictire);
    }
    public get selectedConversation(): Conversation{
        return this.componentsService?.selectedChat;
    }
    public get lastSeen(): string{
        return 'Online - Yesterday';
    }
    public async sendMessage(): Promise<void>{
        const conversationMessage: ConversationMessage = {
            clientGeneratedId: this.componentsService.generateGuid(),
            deleted: false,
            content: {
                text: this.newMessage,
                mediaContents: undefined
            }
        }
        if(this.selectedConversation.id){
            await this.hubService.WriteMessageToChat(this.selectedConversation.id, conversationMessage)
                .then(result => {

                });
            this.newMessage = '';
        }
    }
    ngOnInit(): void{
        if (this.selectedConversation?.id){
            this.hubService.GetChatMessages(this.selectedConversation.id, 0)
                .then(messagesList => {
                    this.messages = messagesList;
                });
        }
    }
}