import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit{
    public contactsGridTitle: string = "My Contacts";
    public searchModeEnabled: boolean = false;
    constructor(){

    }
    public changeHeaderTitle(): void{
        this.contactsGridTitle = (this.searchModeEnabled === false) ? "Search result" : "My Contacts"
        this.searchModeEnabled = !this.searchModeEnabled;
    }
    ngOnInit(): void{
        
    }
}