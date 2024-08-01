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
//import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(
    private afAuth: Auth,
    //private toastr: ToastrService,
    private router: Router
  ) {
    this.user$ = authState(this.afAuth);
  }

  async login(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.afAuth,
        email,
        password
      );
      console.log('User Authenthicated Successfully');
      this.router.navigate(['/posts']);
      this.loadUser();
      return userCredential.user;
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }

  async loadUser(): Promise<User | null> {
    try {
      const user = this.afAuth.currentUser; // Await currentUser to get the actual user
      console.log(user, 'user 1');
      if (user) {
        // Serialize user object to a plain object
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        console.log(userData, 'userData from auth service load');
        localStorage.setItem('user', JSON.stringify(userData));
        return user;
      } else {
        console.log('No user is signed in.');
        return null;
      }
    } catch (error) {
      console.error('Error loading user:', error);
      return null;
    }
  }
}
