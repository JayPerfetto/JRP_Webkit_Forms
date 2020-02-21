import * as functions from 'firebase-functions';
import { admin } from '../../global';

export const addCreateDate = functions.firestore
.document('{collectionId}/{docId}')
.onCreate((snap, context) => {
    return snap.ref.set(
        {
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
    );
});
