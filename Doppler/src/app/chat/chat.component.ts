import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HubService } from '../services/communication/hub.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
    private id: string = '';
    constructor(private hubService: HubService, private activateRoute: ActivatedRoute){
        
    }
    ngOnInit(): void{
        this.activateRoute.params.subscribe(params => {
            
        });
    }
}