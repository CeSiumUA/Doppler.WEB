import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { environment } from "src/environments/environment";
import { Contact } from "src/models/contact";
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class HubService{
    private connection : signalR.HubConnection;
    constructor(private authService : AuthenticationService){
        this.connection = new signalR.HubConnectionBuilder()
                            .withUrl(`${environment.apiUrl}/socialHub`, {
                                accessTokenFactory: () => this.authService.accessToken
                            })
                            .build();
    }
    public async getContact(login: string): Promise<Contact>{
        await this.startConnection();
        return await this.connection.invoke('GetUser', login);
    }
    private async startConnection(): Promise<void>{
        if(this.connection.state !== signalR.HubConnectionState.Connected){
            return await this.connection.start();
        }
    }
}