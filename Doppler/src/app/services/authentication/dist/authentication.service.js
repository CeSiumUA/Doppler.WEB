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
exports.AuthenticationService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var UrlResolver_1 = require("../../../environments/UrlResolver");
var static_repository_1 = require("../../../repository/static.repository");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http, router) {
        this.http = http;
        this.router = router;
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
    AuthenticationService.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, Promise, function () {
            var authModel, expireTime, issuedTime, currentTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authModel = this.getAuthModel();
                        if (!authModel) return [3 /*break*/, 2];
                        expireTime = (new Date(authModel.accessToken.expireDate)).getTime();
                        issuedTime = (new Date(authModel.accessToken.issueDate)).getTime();
                        currentTime = (new Date()).getTime();
                        if (expireTime > (currentTime + 0.2 * (expireTime - issuedTime))) {
                            return [2 /*return*/, authModel.accessToken.token];
                        }
                        return [4 /*yield*/, this.getRefreshToken()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        this.router.navigateByUrl('/login');
                        return [2 /*return*/, ''];
                }
            });
        });
    };
    Object.defineProperty(AuthenticationService.prototype, "loginName", {
        get: function () {
            var _a;
            return (_a = this.getAuthModel()) === null || _a === void 0 ? void 0 : _a.user.login;
        },
        enumerable: false,
        configurable: true
    });
    AuthenticationService.prototype.getRefreshToken = function () {
        var _a, _b;
        return __awaiter(this, void 0, Promise, function () {
            var headerDictionary, refreshTokenUrl;
            var _this = this;
            return __generator(this, function (_c) {
                headerDictionary = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Authorization': "Bearer " + ((_a = this.getAuthModel()) === null || _a === void 0 ? void 0 : _a.accessToken.token),
                    'RefreshToken': "" + ((_b = this.getAuthModel()) === null || _b === void 0 ? void 0 : _b.refreshToken.token)
                };
                refreshTokenUrl = UrlResolver_1.UrlResolver.GetRefreshTokenUrl();
                return [2 /*return*/, this.http.post(refreshTokenUrl, {}, {
                        headers: new http_1.HttpHeaders(headerDictionary)
                    }).pipe(operators_1.map(function (authResult) {
                        if (authResult) {
                            _this.staticRepository.saveLoginData(authResult);
                        }
                        else {
                            _this.router.navigateByUrl('/login');
                        }
                        return authResult.accessToken.token;
                    }), operators_1.catchError(function (error) {
                        _this.router.navigateByUrl('/login');
                        return rxjs_1.of("Unauthorized");
                    })).toPromise()];
            });
        });
    };
    AuthenticationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
