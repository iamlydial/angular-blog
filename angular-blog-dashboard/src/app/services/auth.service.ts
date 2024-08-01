import { Injectable } from '@angular/core';
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: Auth,
    private toastr: ToastrService,
    private router: Router
  ) {}

  async login(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.afAuth,
        email,
        password
      );
      this.toastr.success('User Authenthicated Successfully');
      this.router.navigate(['/posts']);
      return userCredential.user;
    } catch (error: any) {
      this.toastr.warning(error);
      return null;
    }
  }
}
