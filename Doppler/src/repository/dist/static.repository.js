"use strict";
exports.__esModule = true;
exports.StaticRepository = void 0;
var StaticRepository = /** @class */ (function () {
    function StaticRepository() {
    }
    StaticRepository.prototype.saveLoginData = function (authModel) {
        var jsonString = JSON.stringify(authModel);
        localStorage.setItem('authData', jsonString);
    };
    StaticRepository.prototype.getLoginData = function () {
        var json = localStorage.getItem('authData');
        if (!json) {
            return null;
        }
        var authModel = JSON.parse(json);
        return authModel;
    };
    return StaticRepository;
}());
exports.StaticRepository = StaticRepository;
