import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/data/User';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

    user$: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
    ) {
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`Users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );
    }

    async googleSignin() {
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      return this.updateUserData(credential.user);
    }

    public updateUserData(user) {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`Users/${user.uid}`);
      return userRef.set(user, { merge: true })
    }

    async signOut() {
      await this.afAuth.auth.signOut();
      this.router.navigate(['/pages/login']);
    }
}
