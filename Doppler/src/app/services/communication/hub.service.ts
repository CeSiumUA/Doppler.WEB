import { Injectable, Pipe } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { environment } from "src/environments/environment";
import { Contact } from "src/models/contact";
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';
import { User, UserContact } from '../authentication/User';
import { LikeResult } from '../../../models/LikeResult';
import { Conversation } from 'src/models/Conversation';
import { Message } from '../../../models/Message';

@Injectable({
    providedIn: 'root'
})
export class HubService{
    private connection : signalR.HubConnection;
    private connectionPromise: Promise<void> | undefined;
    constructor(public authService : AuthenticationService){
        this.connection = new signalR.HubConnectionBuilder()
                            .withUrl(`${environment.apiUrl}/socialHub`, {
                                accessTokenFactory: async () => await this.authService.getAccessToken()
                            })
                            .build();
        this.connectionPromise = this.connection.start();
    }
    public async getUser(login: string): Promise<Contact>{
        await this.startConnection();
        return await this.connection.invoke('GetUser', login);
    }
    public async getContact(login: string): Promise<UserContact>{
        await this.startConnection();
        return await this.connection.invoke('GetContact', login);
    }
    public async startConnection(): Promise<boolean>{
        if(this.connection.state === signalR.HubConnectionState.Disconnected){
            this.connectionPromise = this.connection.start();
        }
        await this.connectionPromise;
        return true;
    }
    public async addToContacts(login: string, displayName: string | null = null): Promise<void>{
        return await this.connection.invoke('AddToContacts', login, displayName);
    }
    public async GetUserContacts(skip: number | null = 0, take: number | null = null): Promise<UserContact[]>{
        await this.startConnection();
        return await this.connection.invoke('GetUserContacts', skip, take);
    }
    public async SearchUser(searchPatern: string): Promise<User[]>{
        await this.startConnection();
        return await this.connection.invoke('SearchUsers', searchPatern);
    }
    public async RateProfile(login: string, like: boolean = true): Promise<LikeResult>{
        await this.startConnection();
        return await this.connection.invoke('RateProfile', login, like);
    }
    public async CheckUserForLike(login: string): Promise<boolean>{
        await this.startConnection();
        return await this.connection.invoke('CheckUserForLike', login);
    }
    public async GetDialogueInstanceId(login: string): Promise<string>{
        await this.startConnection();
        return await this.connection.invoke('GetDialogueInstanceId', login);
    }
    public async GetUserConversations(skip: number | null = 0, take: number | null = null): Promise<Conversation[]>{
        await this.startConnection();
        return await this.connection.invoke('GetUserConversations', skip, take);
    }
    public async GetChatMessages(chatId: string | undefined, skip: number | null = 0, take: number | null = 25): Promise<Message[]>{
        await this.startConnection();
        return await this.connection.invoke('GetConversationMessages', chatId, skip, take);
    }
}