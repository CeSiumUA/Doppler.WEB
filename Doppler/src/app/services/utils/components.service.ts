import { Injectable } from "@angular/core";
import { Conversation } from '../../../models/Conversation';

@Injectable({
    providedIn: 'root',
})
export class ComponentsService{
    public selectedChat!: Conversation;
    public toggleToolbar: boolean = false;
    constructor(){

    }
}