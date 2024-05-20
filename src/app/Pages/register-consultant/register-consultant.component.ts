import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/Services/firebase.service';

@Component({
  selector: 'app-register-consultant',
  templateUrl: './register-consultant.component.html',
  styleUrls: ['./register-consultant.component.css']
})
export class RegisterConsultantComponent {

  email: string = '';
  password: string = '';
  nom: string = '';

  constructor(private firebaseService: FirebaseService) { }

  registerConsultant() {
    const role = 'consultant'; // Définir le rôle comme consultant
    this.firebaseService.registerConsultant(this.email, this.password, this.nom, role)
      .then(() => {
        console.log('Consultant enregistré avec succès.');
      })
      .catch((error) => {
        console.error('Erreur lors de l\'enregistrement du consultant :', error);
      });
  }
}
