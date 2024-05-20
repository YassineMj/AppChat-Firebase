import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './Pages/login-admin/login-admin.component';
import { registerLocaleData } from '@angular/common';
import { RegisterAdminComponent } from './Pages/register-admin/register-admin.component';
import { RegisterConsultantComponent } from './Pages/register-consultant/register-consultant.component';
import { LoginConsultantComponent } from './Pages/login-consultant/login-consultant.component';
import { ConversationAdminComponent } from './Pages/conversation-admin/conversation-admin.component';
import { ConversationConsultantComponent } from './Pages/conversation-consultant/conversation-consultant.component';
import { ChatComponent } from './Pages/chat/chat.component';


const routes: Routes = [
  { path: 'register-admin', component: RegisterAdminComponent },
  { path: 'login-admin', component: LoginAdminComponent },
  { path: 'admin-conversations/:id', component:ConversationAdminComponent }, 

  { path: 'register-consultant', component: RegisterConsultantComponent },
  { path: 'login-consultant', component: LoginConsultantComponent },
  { path: 'consultant-conversations/:id', component:ConversationConsultantComponent }, 

  { path: 'chat/:idConversation/:idSender/:nomSender', component:ChatComponent }, 


  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
