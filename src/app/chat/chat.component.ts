import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HubService } from '../services/communication/hub.service';
import { ConversationMessage, ConversationMember } from '../../models/Message';
import { ComponentsService } from '../services/utils/components.service';
import { Conversation, Dialogue } from '../../models/Conversation';
import { UrlResolver } from '../../environments/UrlResolver';
import { DefaultImageType } from 'src/environments/enums.helper';
import { Contact } from '../../models/contact';
import { MatDialog } from '@angular/material/dialog';
import { ProfileModalBoxComponent } from '../profile/profile_modal_box/profileModalBox.component';
import { ProfileCardType } from '../services/authentication/User';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy{
    public messages: ConversationMessage[] = [];
    public conversationMembers: ConversationMember[] = [];
    public newMessage: string = '';
    public messagesLoading = true;
    public selectedChatMessage: string = '';
    public typingMember: string | undefined = undefined;
    private typingSubscriptionMethod: string = 'HandleChatTyping';
    private _selectedConversation: Conversation = this.componentsService?.selectedChat;
    private lastInputTime = new Date().getTime();
    constructor(private hubService: HubService, private dialog: MatDialog, private activatedRoute: ActivatedRoute, private componentsService: ComponentsService, private authService: AuthenticationService){
        
    }
    ngOnDestroy(): void {
        this.hubService.UnsubscribeFromMethod(this.typingSubscriptionMethod);
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
    public get subTitle(): string{
        if (this.typingMember) {
            return `${this.typingMember} is typing...`;
        }
        return this.lastSeen;
    }
    public getUserNameColor(message: ConversationMessage): string{
        let style = 'color: ';
        const color = message?.sender?.color;
        if (color){
            style += color;
        }
        return style;
    }
    public isChatMessageSelected(messageId: string | undefined): boolean{
        return messageId === this.selectedChatMessage;
    }
    public handleMessageBoxClick(messageId: string | undefined): void{
        if (messageId){
            if (this.selectedChatMessage === messageId){
                this.selectedChatMessage = '';
            }
            else{
                this.selectedChatMessage = messageId;
            }
        }
    }
    public async sendMessage(): Promise<void>{
        const conversationMessage: ConversationMessage = {
            clientGeneratedId: this.componentsService.generateGuid(),
            deleted: false,
            content: {
                text: this.newMessage,
                mediaContents: []
            }
        }
        if (this.selectedConversation.id){
            await this.hubService.WriteMessageToChat(this.selectedConversation.id, conversationMessage)
                .then(result => {
                    if (result.delivered){
                        conversationMessage.sender = this.conversationMembers.filter(usr => usr.userId === this.authService.user?.id)[0];
                        this.messages.push(conversationMessage);
                    }
                });
            this.newMessage = '';
        }
    }
    private async loadMessages(): Promise<void>{
        await this.subscribeForTyping();
        return await this.hubService.GetChatMessages(this.selectedConversation.id, 0)
                .then(messagesList => {
                    this.messages = messagesList;
                    this.messagesLoading = false;
                });
    }
    private async subscribeForTyping() {
        await this.hubService.SubscribeToMethod(this.typingSubscriptionMethod, (chatId: string, typer: string) => {
            const typerName = this.conversationMembers.filter(clnt => clnt.user.phoneNumber === typer)[0].displayName;
            this.typingMember = typerName;
            setInterval(() => {
                this.typingMember = undefined;
            }, 4000);
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
                profileId: this.authService.loginName,
                profileCardType: ProfileCardType.UserProfile,
            },
        });
    }
    private async loadConversationMembers() {
        
    }
    async ngOnInit(): Promise<void>{
        const conversationId = this.activatedRoute.snapshot.params.id;
        await this.hubService.GetUserConversation(conversationId).then(async result => {
            this._selectedConversation = result;
            const dialogue = result as Dialogue;
            if (dialogue.firstUser && dialogue.secondUser){
                this.conversationMembers = [];
                this.conversationMembers.push(dialogue.firstUser);
                this.conversationMembers.push(dialogue.secondUser);
            }
            return await this.loadMessages();
        });
    }
}