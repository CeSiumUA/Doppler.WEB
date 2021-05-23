import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from '../appmaterial.module';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProfileModalBoxComponent } from './profile/profile_modal_box/profileModalBox.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AuthInterceptor } from './services/communication/auth.interceptor';
import { SecurePipe } from './services/communication/secure.pipe';
import { ChatsComponent } from './chats/chats.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ToolbarComponent,
    ProfileModalBoxComponent,
    ContactsComponent,
    SecurePipe,
    ChatsComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppMaterialModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
