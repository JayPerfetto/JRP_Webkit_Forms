import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Questionnaire } from 'app/models/data/Questionnaire';
import * as firebase from 'firebase';
import { AuthService } from 'app/shared/auth/auth.service';
import { User } from 'app/models/data/User';

@Injectable({
    providedIn: 'root'
})
export class QuestionnaireService {
    collection = 'Questionnaires';
    user: User;
    constructor(public db: AngularFirestore, private auth: AuthService) {
        this.auth.user$.subscribe(authUser => {
            this.user = authUser;
        });
    }

    getQuestionnaire(docId) {
        return this.db
            .collection(this.collection)
            .doc(docId)
            .snapshotChanges();
    }

    updateQuestionnaire(docId, value: Questionnaire) {
        value.updatedAt = new firebase.firestore.Timestamp(
            Math.floor(new Date().getTime() / 1000),
            Math.floor(new Date().getMilliseconds()));

        value.updateUser = this.user;

        return this.db
            .collection(this.collection)
            .doc(docId)
            .set(value);
    }

    deleteQuestionnaire(docId) {
        return this.db
            .collection(this.collection)
            .doc(docId)
            .delete();
    }

    getQuestionnaires() {
        return this.db.collection(this.collection, ref => ref.orderBy('createdAt', 'desc')).snapshotChanges();
    }

    async createQuestionnaire(value: Questionnaire) {
        value.updatedAt = new firebase.firestore.Timestamp(
            Math.floor(new Date().getTime() / 1000),
            Math.floor(new Date().getMilliseconds()));

        value.createdAt = new firebase.firestore.Timestamp(
            Math.floor(new Date().getTime() / 1000),
            Math.floor(new Date().getMilliseconds()));

        value.createUser = this.user;
        value.updateUser = this.user;

        return this.db.collection(this.collection).add(value);
    }
}
