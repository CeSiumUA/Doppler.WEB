"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChatComponent = void 0;
var core_1 = require("@angular/core");
var UrlResolver_1 = require("../../environments/UrlResolver");
var enums_helper_1 = require("src/environments/enums.helper");
var ChatComponent = /** @class */ (function () {
    function ChatComponent(hubService, activateRoute, componentsService) {
        this.hubService = hubService;
        this.activateRoute = activateRoute;
        this.componentsService = componentsService;
        this.messages = [];
        this.newMessage = '';
    }
    Object.defineProperty(ChatComponent.prototype, "profileImageUrl", {
        get: function () {
            var _a;
            return UrlResolver_1.UrlResolver.GetImageUrl((_a = this.selectedConversation) === null || _a === void 0 ? void 0 : _a.iconUrl, enums_helper_1.DefaultImageType.ProfilePictire);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChatComponent.prototype, "selectedConversation", {
        get: function () {
            var _a;
            return (_a = this.componentsService) === null || _a === void 0 ? void 0 : _a.selectedChat;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChatComponent.prototype, "lastSeen", {
        get: function () {
            return 'Online - Yesterday';
        },
        enumerable: false,
        configurable: true
    });
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _a;
        if ((_a = this.selectedConversation) === null || _a === void 0 ? void 0 : _a.id) {
            this.hubService.GetChatMessages(this.selectedConversation.id, 0)
                .then(function (messagesList) {
                _this.messages = messagesList;
            });
        }
    };
    ChatComponent = __decorate([
        core_1.Component({
            selector: 'app-chat',
            templateUrl: './chat.component.html',
            styleUrls: ['./chat.component.css']
        })
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
