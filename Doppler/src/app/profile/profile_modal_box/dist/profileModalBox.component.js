"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.ProfileModalBoxComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var UrlResolver_1 = require("../../../environments/UrlResolver");
var enums_helper_1 = require("src/environments/enums.helper");
var ProfileModalBoxComponent = /** @class */ (function () {
    function ProfileModalBoxComponent(profileUrl, hubService) {
        this.profileUrl = profileUrl;
        this.hubService = hubService;
        this.name = '';
        this.phoneNumber = '';
        this.description = '';
        this.imageUrl = '';
        this.loading = false;
    }
    Object.defineProperty(ProfileModalBoxComponent.prototype, "image", {
        get: function () {
            return UrlResolver_1.UrlResolver.GeImageUrl(this.imageUrl, enums_helper_1.DefaultImageType.ProfilePictire);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProfileModalBoxComponent.prototype, "urlImage", {
        get: function () {
            return "url('" + this.image + "')";
        },
        enumerable: false,
        configurable: true
    });
    ProfileModalBoxComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.hubService.getContact(this.profileUrl)
            .then(function (response) {
            _this.name = response.name,
                _this.phoneNumber = response.phoneNumber,
                _this.imageUrl = response.iconUrl,
                _this.loading = false,
                _this.description = response.description;
        });
    };
    ProfileModalBoxComponent = __decorate([
        core_1.Component({
            selector: 'app-profile-modalbox',
            templateUrl: './profileModalBox.component.html',
            styleUrls: ['./profileModalBox.component.css']
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ProfileModalBoxComponent);
    return ProfileModalBoxComponent;
}());
exports.ProfileModalBoxComponent = ProfileModalBoxComponent;
