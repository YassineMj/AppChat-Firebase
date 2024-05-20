import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//////////////////////////////////////////////////////////////////////////////
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule } from '@angular/forms';

import { environment } from '../../environments';
//////////////////////////////////////////////////////////////////////////////


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterAdminComponent } from './Pages/register-admin/register-admin.component';
import { LoginAdminComponent } from './Pages/login-admin/login-admin.component';
import { LoginConsultantComponent } from './Pages/login-consultant/login-consultant.component';
import { RegisterConsultantComponent } from './Pages/register-consultant/register-consultant.component';
import { ConversationAdminComponent } from './Pages/conversation-admin/conversation-admin.component';
import { ConversationConsultantComponent } from './Pages/conversation-consultant/conversation-consultant.component';
import { ChatComponent } from './Pages/chat/chat.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterAdminComponent,
    LoginAdminComponent,
    LoginConsultantComponent,
    RegisterConsultantComponent,
    ConversationAdminComponent,
    ConversationConsultantComponent,
    ChatComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,


    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
