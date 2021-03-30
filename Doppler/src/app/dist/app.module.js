"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var service_worker_1 = require("@angular/service-worker");
var environment_1 = require("../environments/environment");
var animations_1 = require("@angular/platform-browser/animations");
var login_component_1 = require("./login/login.component");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var app_routing_module_1 = require("./app-routing.module");
var appmaterial_module_1 = require("../appmaterial.module");
var home_component_1 = require("./home/home.component");
var toolbar_component_1 = require("./toolbar/toolbar.component");
var profileModalBox_component_1 = require("./profile/profile_modal_box/profileModalBox.component");
var contacts_component_1 = require("./contacts/contacts.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                home_component_1.HomeComponent,
                toolbar_component_1.ToolbarComponent,
                profileModalBox_component_1.ProfileModalBoxComponent,
                contacts_component_1.ContactsComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                appmaterial_module_1.AppMaterialModule,
                http_1.HttpClientModule,
                service_worker_1.ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment_1.environment.production }),
                animations_1.BrowserAnimationsModule,
                app_routing_module_1.AppRoutingModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
