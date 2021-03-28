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
    UrlResolver.GeImageUrl = function (imageValue, imageType) {
        if (imageValue) {
            return environment_1.environment.apiUrl + "/cdn/files/" + imageValue;
        }
        return "assets/icons/default/" + imageType.toString();
    };
    return UrlResolver;
}());
exports.UrlResolver = UrlResolver;
