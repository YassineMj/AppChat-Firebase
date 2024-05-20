import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/Services/firebase.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  messages: any[] = [];
  messageText: string = '';
  conversationId: string = ''; // Initialisez l'ID de la conversation avec une valeur par défaut
  idSender:any
  nomSender:any

  constructor(private _service: FirebaseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.conversationId = params['idConversation'];
      this.idSender = params['idSender'];
      this.nomSender=params['nomSender'];

      if (this.conversationId) {
        this.loadMessages(this.conversationId);
      }
    });
  }

  loadMessages(conversationId: string) {
    this._service.getMessages(conversationId).subscribe(
      (messages) => {
        this.messages = messages;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  sendMessage() {
    console.log(this.messageText);
    console.log(this.conversationId);
    console.log(this.idSender);
    
    
    
    if (this.messageText != '') {
      this._service.sendMessage(this.conversationId, this.idSender, this.messageText , this.nomSender)
        .then(() => {
          console.log('Message envoyé avec succès');
          // Effacer le champ de saisie après l'envoi du message
          this.messageText = '';
          // Rafraîchir la liste des messages après l'envoi du message
          this.loadMessages(this.conversationId);
        })
        .catch((error) => {
          console.error('Erreur lors de l\'envoi du message:', error);
        });
    } else {
      console.error('Le message est vide.');
    }
  }
}
