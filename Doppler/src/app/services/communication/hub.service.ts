import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class HubService{
    private connection : signalR.HubConnection;
    constructor(private authService : AuthenticationService){
        this.connection = new signalR.HubConnectionBuilder()
                            .withUrl("/socialHub", {
                                accessTokenFactory: () => this.authService.accessToken
                            })
                            .build();
    }
}