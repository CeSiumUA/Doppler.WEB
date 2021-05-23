"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.HubService = void 0;
var core_1 = require("@angular/core");
var signalR = require("@microsoft/signalr");
var environment_1 = require("src/environments/environment");
var HubService = /** @class */ (function () {
    function HubService(authService) {
        var _this = this;
        this.authService = authService;
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(environment_1.environment.apiUrl + "/socialHub", {
            accessTokenFactory: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.getAccessToken()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); }
        })
            .build();
        this.connectionPromise = this.connection.start();
    }
    HubService.prototype.getUser = function (login) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.startConnection()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.connection.invoke('GetUser', login)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HubService.prototype.getContact = function (login) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.startConnection()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.connection.invoke('GetContact', login)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HubService.prototype.startConnection = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.connection.state === signalR.HubConnectionState.Disconnected) {
                            this.connectionPromise = this.connection.start();
                        }
                        return [4 /*yield*/, this.connectionPromise];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    HubService.prototype.addToContacts = function (login, displayName) {
        if (displayName === void 0) { displayName = null; }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.invoke('AddToContacts', login, displayName)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HubService.prototype.GetUserContacts = function (skip, take) {
        if (skip === void 0) { skip = 0; }
        if (take === void 0) { take = null; }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.startConnection()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.connection.invoke('GetUserContacts', skip, take)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HubService.prototype.SearchUser = function (searchPatern) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.startConnection()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.connection.invoke('SearchUsers', searchPatern)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HubService.prototype.RateProfile = function (login, like) {
        if (like === void 0) { like = true; }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.startConnection()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.connection.invoke('RateProfile', login, like)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HubService.prototype.CheckUserForLike = function (login) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.startConnection()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.connection.invoke('CheckUserForLike', login)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HubService.prototype.GetDialogueInstanceId = function (login) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.startConnection()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.connection.invoke('GetDialogueInstanceId', login)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HubService.prototype.GetUserConversations = function (skip, take) {
        if (skip === void 0) { skip = 0; }
        if (take === void 0) { take = null; }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.startConnection()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.connection.invoke('GetUserConversations', skip, take)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HubService.prototype.GetChatMessages = function (chatId, skip, take) {
        if (skip === void 0) { skip = 0; }
        if (take === void 0) { take = 25; }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.startConnection()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.connection.invoke('GetConversationMessages', chatId, skip, take)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HubService.prototype.WriteMessageToChat = function (chatId, message) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.startConnection()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.connection.invoke('WriteMessageToChat', chatId, message)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HubService.prototype.GetUserConversation = function (conversationId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.startConnection()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.connection.invoke('GetUserConversation', conversationId)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HubService.prototype.SendTypingSignal = function (conversationId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.startConnection()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.connection.invoke('HandleTyping', conversationId)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HubService.prototype.SubscribeToMethod = function (methodName, callBack) {
        this.connection.on('HandleChatTyping', callBack);
    };
    HubService.prototype.UnsubscribeFromMethod = function (methodName) {
        this.connection.off(methodName);
    };
    HubService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], HubService);
    return HubService;
}());
exports.HubService = HubService;
