import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/authentication/auth.guard';
import { ContactsComponent } from './contacts/contacts.component';
import { ChatsComponent } from './chats/chats.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard]},
    { path: 'chats', component: ChatsComponent, canActivate: [AuthGuard]},
    { path: 'chat/:id', component: ChatComponent, canActivate: [AuthGuard]},
    { path: '**', component: HomeComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}