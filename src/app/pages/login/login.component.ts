import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}

  onLogin() {
    if (this.form.valid) {
      this.http
        .post('http://localhost:8080/login', this.form.value, {
          responseType: 'text',
        })
        .subscribe({
          next: (jwt) => {

            this.auth.login(jwt);

            this.router.navigateByUrl('/products');
          },
          error: (error) => {
            if (error.status == 403) {
              alert('Wrong login / password');
            } else {
              alert('Unknown error please contact your administrator');
            }
          },
        });
    }
  }
}
