import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/Services/firebase.service';

@Component({
  selector: 'app-login-consultant',
  templateUrl: './login-consultant.component.html',
  styleUrls: ['./login-consultant.component.css']
})
export class LoginConsultantComponent {

  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private _service: FirebaseService, private router: Router) {}

  onSubmit() {
    if (this.email && this.password) {
      this._service.loginConsultant(this.email, this.password).subscribe(
        (user) => {
          console.log(user);
          
          this.router.navigate(['/consultant-conversations/'+user]);
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
