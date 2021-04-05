"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContactsComponent = void 0;
var core_1 = require("@angular/core");
var ContactsComponent = /** @class */ (function () {
    function ContactsComponent() {
        this.contactsGridTitle = "My Contacts";
        this.searchModeEnabled = false;
    }
    ContactsComponent.prototype.changeHeaderTitle = function () {
        this.contactsGridTitle = (this.searchModeEnabled === false) ? "Search result" : "My Contacts";
        this.searchModeEnabled = !this.searchModeEnabled;
    };
    ContactsComponent.prototype.ngOnInit = function () {
    };
    ContactsComponent = __decorate([
        core_1.Component({
            selector: 'app-contacts',
            templateUrl: './contacts.component.html',
            styleUrls: ['./contacts.component.css']
        })
    ], ContactsComponent);
    return ContactsComponent;
}());
exports.ContactsComponent = ContactsComponent;
