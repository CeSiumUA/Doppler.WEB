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
    public generateGuid(): string{
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })
    }
}