import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AuthService } from 'app/shared/auth/auth.service';
import { User } from 'app/models/data/User';

@Injectable({
  providedIn: 'root'
})

export class UserService {
    collection = 'Users';
    user: User;
    constructor(public db: AngularFirestore, private auth: AuthService) {
        this.auth.user$.subscribe(authUser => {
            this.user = authUser;
        });
    }

    getUser(docId) {
        return this.db
            .collection(this.collection)
            .doc(docId)
            .snapshotChanges();
    }

    updateUser(docId, value: User) {
        value.updatedAt = new firebase.firestore.Timestamp(
            Math.floor(new Date().getTime() / 1000),
            Math.floor(new Date().getMilliseconds()));

        value.updateUser = this.user;

        return this.db
            .collection(this.collection)
            .doc(docId)
            .set(value);
    }

    deleteUser(docId) {
        return this.db
            .collection(this.collection)
            .doc(docId)
            .delete();
    }

    getUsers() {
        return this.db.collection(this.collection, ref => ref.orderBy('displayName', 'desc')).snapshotChanges();
    }

    async createUser(value: User) {
        value.updatedAt = new firebase.firestore.Timestamp(
            Math.floor(new Date().getTime() / 1000),
            Math.floor(new Date().getMilliseconds()));

        value.createdAt = new firebase.firestore.Timestamp(
            Math.floor(new Date().getTime() / 1000),
            Math.floor(new Date().getMilliseconds()));

        value.updateUser = this.user;

        return this.db.collection(this.collection).add(value);
    }
}
