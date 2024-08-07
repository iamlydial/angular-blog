import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  User,
  authState,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>;
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedInGuard: boolean = false;

  constructor(
    private afAuth: Auth,
    private router: Router
  ) {
    this.user$ = authState(this.afAuth);
    this.user$.subscribe((user) => this.loggedIn.next(!!user));
  }

  async login(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.afAuth,
        email,
        password
      );
      console.log('User Authenthicated Successfully');
      this.loadUser();
      this.loggedIn.next(true);
      this.loggedInGuard = true;
      this.router.navigate(['/posts']);

      return userCredential.user;
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }

  logout() {
    const user = this.afAuth.currentUser;
    this.afAuth.signOut();
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.loggedInGuard = false;
    this.router.navigate(['/login']);
    console.log('user successfully logout!');
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

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
