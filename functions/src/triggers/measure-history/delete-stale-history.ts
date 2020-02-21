import * as functions from 'firebase-functions';
import { db } from '../../global';

// TESTED AND WORKING
export const deleteMeasureHistory = functions.firestore
.document('ContractMeasures/{docId}/History/{id}')
.onCreate(async (snap, context) => {
    // get subcollection ordered by create date desc, delete first record if collection size > 30
    const collectionRef = db.collection('ContractMeasures').doc(context.params.docId).collection('History');
        return collectionRef
        .orderBy("updatedAt", "asc")
        .get()
        .then((query: any) => {
            if (!query.empty && query.size > 30) {
                //We know there is one doc in the querySnapshot
                const queryDocumentSnapshot = query.docs[0];
                return queryDocumentSnapshot.ref.delete();
            } else {
                console.log("No document corresponding to the query!");
                return null;
            }
        })
        .catch((err: any) => console.log(err) )
});