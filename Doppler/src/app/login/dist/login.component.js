"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService, snackBar, router) {
        this.authService = authService;
        this.snackBar = snackBar;
        this.router = router;
        this.loggingIn = false;
        this.UserName = '';
        this.Password = '';
        this.nextUrl = '';
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loggingIn = true;
        this.authService.login(this.UserName, this.Password).pipe(operators_1.map(function (x) {
            _this.loggingIn = false;
        }), operators_1.catchError(function (x) {
            _this.loggingIn = false;
            _this.showError(x.message);
            return rxjs_1.of('');
        })).subscribe(function (next) {
            _this.router.navigateByUrl('/');
        }, function (error) {
            _this.showError(error.message);
        });
    };
    LoginComponent.prototype.showError = function (errorText) {
        this.snackBar.open(errorText, 'Dismiss', {
            duration: 10000
        });
    };
    __decorate([
        core_1.Input()
    ], LoginComponent.prototype, "nextUrl");
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
