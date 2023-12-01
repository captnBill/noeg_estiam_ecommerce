import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HomeComponent,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private auth: AuthService, private router: Router) {}

  user: User | null = null;

  ngOnInit() {
    this.auth._user.subscribe((user) => (this.user = user));
    this.auth.login();
  }

  onClicLogout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
