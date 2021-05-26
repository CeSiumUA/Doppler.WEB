import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HubService } from '../services/communication/hub.service';
import { ConversationMessage } from '../../models/Message';
import { ComponentsService } from '../services/utils/components.service';
import { Conversation } from '../../models/Conversation';
import { UrlResolver } from '../../environments/UrlResolver';
import { DefaultImageType } from 'src/environments/enums.helper';
import { Contact } from '../../models/contact';
import { MatDialog } from '@angular/material/dialog';
import { ProfileModalBoxComponent } from '../profile/profile_modal_box/profileModalBox.component';
import { ProfileCardType } from '../services/authentication/User';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
    public messages: ConversationMessage[] = [];
    public conversationMembers: Contact[] = [];
    public newMessage: string = '';
    private _selectedConversation: Conversation = this.componentsService?.selectedChat;
    private lastInputTime = new Date().getTime();
    constructor(private hubService: HubService, private dialog: MatDialog, private activatedRoute: ActivatedRoute, private componentsService: ComponentsService){
        
    }
    public get profileImageUrl(): string{
        return UrlResolver.GetImageUrl(this.selectedConversation?.iconUrl, DefaultImageType.ProfilePictire);
    }
    public get selectedConversation(): Conversation{
        return this._selectedConversation;
    }
    public get lastSeen(): string{
        return 'Online - Yesterday';
    }
    public getIconUrl(imageGuid: string | undefined): string{
        return UrlResolver.GetImageUrl(imageGuid, DefaultImageType.ProfilePictire);
    }
    public getUserNameColor(message: ConversationMessage): string{
        let style = 'color: ';
        const color = message?.sender?.color;
        if (color){
            style += color;
        }
        return style;
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
        if (this.selectedConversation.id){
            await this.hubService.WriteMessageToChat(this.selectedConversation.id, conversationMessage)
                .then(result => {

                });
            this.newMessage = '';
        }
    }
    private async loadMessages(): Promise<void>{
        this.subscribeForTyping();
        return await this.hubService.GetChatMessages(this.selectedConversation.id, 0)
                .then(messagesList => {
                    this.messages = messagesList;
                });
    }
    private subscribeForTyping() {
        this.hubService.SubscribeToMethod('HandleChatTyping', (chatId: string, typerNumber: string) => {

        });
    }
    public async handleInput(event: any): Promise<void>{
        const secondsSpan = Date.now() - this.lastInputTime;
        if (secondsSpan > 3000){
            if (this.selectedConversation?.id){
                await this.hubService.SendTypingSignal(this.selectedConversation?.id).then(result => result);
                this.lastInputTime = Date.now();
            }
        }
    }
    public showProfile(): void{
        this.dialog.open(ProfileModalBoxComponent, {
            data: {
                //FIXME
                //profileId: this.authService.loginName,
                profileCardType: ProfileCardType.UserProfile,
            },
        });
    }
    private async loadConversationMembers() {
        
    }
    async ngOnInit(): Promise<void>{
        if (!this.selectedConversation){
            const conversationId = this.activatedRoute.snapshot.params.id;
            await this.hubService.GetUserConversation(conversationId).then(async result => {
                this._selectedConversation = result;
                return await this.loadMessages();
            });
        }else{
            return await this.loadMessages();
        }
    }
}