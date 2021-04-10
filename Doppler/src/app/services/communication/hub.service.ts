import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { environment } from "src/environments/environment";
import { Contact } from "src/models/contact";
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';
import { User, UserContact } from '../authentication/User';

@Injectable({
    providedIn: 'root'
})
export class HubService{
    private connection : signalR.HubConnection;
    constructor(private authService : AuthenticationService){
        this.connection = new signalR.HubConnectionBuilder()
                            .withUrl(`${environment.apiUrl}/socialHub`, {
                                accessTokenFactory: async () => await this.authService.getAccessToken()
                            })
                            .build();
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
            await this.connection.start();
        }
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
}