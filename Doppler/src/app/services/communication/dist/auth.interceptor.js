"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthInterceptor = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(authService) {
        this.authService = authService;
    }
    AuthInterceptor.prototype.intercept = function (req, next) {
        if (!req.headers.has('Authorization')) {
            return rxjs_1.from(this.authService.getAccessToken())
                .pipe(operators_1.switchMap(function (token) {
                var headers = req.headers.set('Authorization', 'Bearer ' + token);
                var requestClone = req.clone({ headers: headers });
                return next.handle(requestClone);
            }));
        }
        return next.handle(req);
    };
    AuthInterceptor = __decorate([
        core_1.Injectable()
    ], AuthInterceptor);
    return AuthInterceptor;
}());
exports.AuthInterceptor = AuthInterceptor;
