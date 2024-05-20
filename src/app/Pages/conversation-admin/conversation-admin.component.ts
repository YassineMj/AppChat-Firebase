import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/Services/firebase.service';

@Component({
  selector: 'app-conversation-admin',
  templateUrl: './conversation-admin.component.html',
  styleUrls: ['./conversation-admin.component.css']
})
export class ConversationAdminComponent {

  adminId: string | null = null;
  conversations: any[] = [];

  constructor(private route: ActivatedRoute, private _service:FirebaseService ,private router:Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.adminId = params['id'];
      if (this.adminId) {
        this.getAdminConversations(this.adminId);
      }
    });
  }

  getAdminConversations(adminId: string) {
    this._service.getAdminConversations(adminId).subscribe(
      (conversations) => {
        this.conversations = conversations;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  displayChat(conversationId: string , idSender:any , nomSender:any) {
    this.router.navigate(['/chat', conversationId,idSender,nomSender]);
  }
}
