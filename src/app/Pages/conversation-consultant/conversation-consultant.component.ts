import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/Services/firebase.service';

@Component({
  selector: 'app-conversation-consultant',
  templateUrl: './conversation-consultant.component.html',
  styleUrls: ['./conversation-consultant.component.css']
})
export class ConversationConsultantComponent {

  consultantd: string | null = null;
  conversations: any[] = [];

  constructor(private route: ActivatedRoute, private _service:FirebaseService ,private router:Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.consultantd = params['id'];
      if (this.consultantd) {
        this.getConsultantConversations(this.consultantd);
      }
    });
  }

  getConsultantConversations(consultantd: string) {
    this._service.getConversationsForConsultant(consultantd).subscribe(
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
