import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/Services/firebase.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent {

  email: string = '';
  password: string = '';
  nom: string = '';

  constructor(private firebaseService: FirebaseService) { }

  registerAdmin() {
    const role = 'admin'; // Définir le rôle comme administrateur
    this.firebaseService.registerAdmin(this.email, this.password, this.nom, role)
      .then(() => {
        console.log('Admin enregistré avec succès.');
      })
      .catch((error) => {
        console.error('Erreur lors de l\'enregistrement de l\'admin :', error);
      });
  }


}
