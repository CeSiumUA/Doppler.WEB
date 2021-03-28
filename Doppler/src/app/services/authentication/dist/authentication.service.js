"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthenticationService = void 0;
var core_1 = require("@angular/core");
var UrlResolver_1 = require("../../../environments/UrlResolver");
var static_repository_1 = require("../../../repository/static.repository");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.staticRepository = new static_repository_1.StaticRepository();
    }
    AuthenticationService.prototype.login = function (UserName, Password) {
        var _this = this;
        if (UserName && Password) {
            return this.http.post(UrlResolver_1.UrlResolver.GetLoginUrl(), {
                'UserName': UserName,
                'Password': Password
            }).pipe(operators_1.map(function (authResult) {
                if (authResult) {
                    _this.staticRepository.saveLoginData(authResult);
                }
                else {
                    throw new Error('invalidCredentials');
                }
                return authResult;
            }));
        }
        return rxjs_1.of('Credentials are empty!').pipe(operators_1.map(function (x) {
            throw new Error('Credentials are empty!');
        }));
    };
    AuthenticationService.prototype.checkAuth = function () {
        var authModel = this.getAuthModel();
        if (authModel) {
            return true;
        }
        return false;
    };
    AuthenticationService.prototype.logout = function () {
        this.staticRepository.clearLoginData();
    };
    AuthenticationService.prototype.getAuthModel = function () {
        return this.staticRepository.getLoginData();
    };
    Object.defineProperty(AuthenticationService.prototype, "userName", {
        get: function () {
            var _a;
            return (_a = this.getAuthModel()) === null || _a === void 0 ? void 0 : _a.user.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AuthenticationService.prototype, "phoneNumber", {
        get: function () {
            var _a;
            return (_a = this.getAuthModel()) === null || _a === void 0 ? void 0 : _a.user.phoneNumber;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AuthenticationService.prototype, "profilePicture", {
        get: function () {
            var _a;
            return (_a = this.getAuthModel()) === null || _a === void 0 ? void 0 : _a.user.iconUrl;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AuthenticationService.prototype, "accessToken", {
        get: function () {
            var _a;
            var token = (_a = this.getAuthModel()) === null || _a === void 0 ? void 0 : _a.accessToken.token;
            if (token)
                return token;
            return '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AuthenticationService.prototype, "loginName", {
        get: function () {
            var _a;
            return (_a = this.getAuthModel()) === null || _a === void 0 ? void 0 : _a.user.login;
        },
        enumerable: false,
        configurable: true
    });
    AuthenticationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
