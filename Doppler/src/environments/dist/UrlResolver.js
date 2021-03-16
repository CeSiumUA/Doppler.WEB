"use strict";
exports.__esModule = true;
exports.UrlResolver = void 0;
var environment_1 = require("./environment");
var UrlResolver = /** @class */ (function () {
    function UrlResolver() {
    }
    UrlResolver.GetLoginUrl = function () {
        return environment_1.environment.apiUrl + "/api/authentication/authenticate";
    };
    return UrlResolver;
}());
exports.UrlResolver = UrlResolver;
