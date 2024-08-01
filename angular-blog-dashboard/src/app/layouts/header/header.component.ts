import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  emailUser: string = '';
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.emailUser = parsedUser.email; // Access the email property
      console.log(this.emailUser, 'user email from local storage');
     
    } else {
      console.log('No user found in local storage');
    }
  }
}
