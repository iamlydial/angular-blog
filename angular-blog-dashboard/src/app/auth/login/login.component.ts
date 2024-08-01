import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from 'express';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  async onSubmit(form: NgForm) {
    console.log(form);
    const formValue = form.value;
    console.log(formValue, 'formValue');
    try {
      const user = await this.authService.login(
        formValue.email,
        formValue.password
      );
      if (user) {
        console.log('User signed in:', user);
        
        
      } else {
        console.log('Failed to sign in');
      }
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  }
}
