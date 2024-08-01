import { Injectable } from '@angular/core';
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  authState,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>; 

  constructor(
    private afAuth: Auth,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.user$ = authState(this.afAuth); /
  }

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

  async loadUser(): Promise<User | null> {
    const user = this.afAuth.currentUser;
    if (user) {
      console.log(JSON.parse(JSON.stringify(user))); // Log user details
      return user;
    } else {
      console.log('No user is signed in.');
      return null;
    }
  }
}
