"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SecurePipe = void 0;
var core_1 = require("@angular/core");
var map_1 = require("rxjs/internal/operators/map");
var SecurePipe = /** @class */ (function () {
    function SecurePipe(http, sanitizer) {
        this.http = http;
        this.sanitizer = sanitizer;
    }
    SecurePipe.prototype.transform = function (url) {
        var _this = this;
        return this.http
            .get(url, { responseType: 'blob' })
            .pipe(map_1.map(function (val) { return _this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val)); }));
    };
    SecurePipe = __decorate([
        core_1.Pipe({
            name: 'secure'
        })
    ], SecurePipe);
    return SecurePipe;
}());
exports.SecurePipe = SecurePipe;
