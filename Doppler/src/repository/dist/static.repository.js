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
    return StaticRepository;
}());
exports.StaticRepository = StaticRepository;
