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
exports.ProfileModalBoxComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var UrlResolver_1 = require("../../../environments/UrlResolver");
var enums_helper_1 = require("src/environments/enums.helper");
var User_1 = require("../../services/authentication/User");
var ProfileModalBoxComponent = /** @class */ (function () {
    function ProfileModalBoxComponent(profileSettings, hubService, httpClient) {
        this.profileSettings = profileSettings;
        this.hubService = hubService;
        this.httpClient = httpClient;
        //TODO Auth Check
        this.name = '';
        this.phoneNumber = '';
        this.description = '';
        this.imageUrl = '';
        this.loading = false;
        this.likes = 0;
        this.isLiked = false;
        this.likesLoading = true;
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
            //return `url('${this.image}')`;
            return this.image;
        },
        enumerable: false,
        configurable: true
    });
    ProfileModalBoxComponent.prototype.addToContacts = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.hubService.addToContacts(this.profileSettings.profileId)
                            .then(function (x) { return x; })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfileModalBoxComponent.prototype.startChatting = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ProfileModalBoxComponent.prototype.likeProfile = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.likesLoading = true;
                        return [4 /*yield*/, this.hubService.RateProfile(this.profileSettings.profileId, !this.isLiked)
                                .then(function (result) {
                                _this.likes = result.likes,
                                    _this.isLiked = result.isLiked;
                                _this.likesLoading = false;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProfileModalBoxComponent.prototype.setActivePhoto = function (files) {
        return __awaiter(this, void 0, Promise, function () {
            var firstFile, endpoint, formData;
            return __generator(this, function (_a) {
                if (files !== null) {
                    firstFile = files.item(0);
                    if (firstFile != null) {
                        endpoint = UrlResolver_1.UrlResolver.GetFileUploadUrl();
                        formData = new FormData();
                        formData.append('files', firstFile, firstFile.name);
                        this.httpClient
                            .post(endpoint, formData)
                            .subscribe(function (result) {
                        });
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(ProfileModalBoxComponent.prototype, "profileCardType", {
        get: function () {
            return User_1.ProfileCardType;
        },
        enumerable: false,
        configurable: true
    });
    ProfileModalBoxComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        if (this.profileSettings.profileCardType === User_1.ProfileCardType.MyContactProfile) {
            this.hubService.getContact(this.profileSettings.profileId)
                .then(function (response) {
                _this.name = response.displayName;
                _this.phoneNumber = response.contact.phoneNumber;
                _this.imageUrl = response.contact.iconUrl;
                _this.loading = false;
                _this.description = response.contact.description;
                _this.likes = response.contact.likes;
                if (_this.likes === 0) {
                    _this.likes = 'LIKE';
                }
            });
        }
        else {
            this.hubService.getUser(this.profileSettings.profileId)
                .then(function (response) {
                _this.name = response.name;
                _this.phoneNumber = response.phoneNumber;
                _this.imageUrl = response.iconUrl;
                _this.loading = false;
                _this.description = response.description;
                _this.likes = response.likes;
            });
        }
        this.hubService.CheckUserForLike(this.profileSettings.profileId)
            .then(function (result) {
            _this.isLiked = result;
            _this.likesLoading = false;
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
