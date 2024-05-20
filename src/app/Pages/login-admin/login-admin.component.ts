import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/Services/firebase.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private _service: FirebaseService, private router: Router) {}

  onSubmit() {
    if (this.email && this.password) {
      this._service.loginAdmin(this.email, this.password).subscribe(
        (user) => {
          console.log(user);
          
          this.router.navigate(['/admin-conversations/'+user]); // Rediriger avec l'ID de l'administrateur
        },
        (error) => {
          this.errorMessage = 'Email ou mot de passe incorrect.';
        }
      );
    } else {
      this.errorMessage = 'Tous les champs sont obligatoires.';
    }
  }
}
