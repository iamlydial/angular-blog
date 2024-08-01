import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  emailUser: string = '';
  isLoggedIn$!: Observable<boolean>;
  private subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Access localStorage only in the browser
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        this.emailUser = parsedUser.email; // Access the email property
        console.log(this.emailUser, 'user email from local storage');
      } else {
        console.log('No user found in local storage');
      }
    }

    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  onLogOut() {
    this.authService.logout();
  }
}
