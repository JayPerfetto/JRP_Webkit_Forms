import * as functions from 'firebase-functions';
import { admin } from '../../global';
import { CollectionStat } from '../../models/collection-stats/collectionStat';

export const collectionStatAggregatorCreate = functions.firestore
.document('{collectionId}/{docId}')
.onCreate((snap, context) => {
    const collectionId = context.params.collectionId; 
    
    // ref to the changed collection:
    const collectionRef = admin.firestore().collection(collectionId);

    // ref to the stat document
    const statDocRef = admin.firestore().collection('CollectionStats').doc(collectionId)
    if (collectionId !== 'CollectionStats') {
        // get all comments and aggregate
        return collectionRef
            .get()
            .then((querySnapshot: any) => {

            // get the total document count
            const docCount = querySnapshot.size

            // record timestamp
            const updatedAt = admin.firestore.FieldValue.serverTimestamp();

            // data to update on the document
            const data: CollectionStat = { 
                collectionName: collectionId,
                docCount: docCount,
                updatedAt: updatedAt
            }
            
            // run update
            return statDocRef.set(data, { merge: true });
        })
            .catch((err: any) => console.log(err) )
    } else {
        return 0;
    }
});


export const collectionStatAggregatorDelete = functions.firestore
.document('{collectionId}/{docId}')
.onDelete((snap, context) => {
    const collectionId = context.params.collectionId; 
    
    // ref to the changed collection:
    const collectionRef = admin.firestore().collection(collectionId);

    // ref to the stat document
    const statDocRef = admin.firestore().collection('CollectionStats').doc(collectionId)
    if (collectionId !== 'CollectionStats') {
        // get all comments and aggregate
        return collectionRef
            .get()
            .then((querySnapshot: any) => {

            // get the total document count
            const docCount = querySnapshot.size

            // record timestamp
            const updatedAt = admin.firestore.FieldValue.serverTimestamp();

            // data to update on the document
            const data: CollectionStat = { 
                collectionName: collectionId,
                docCount: docCount,
                updatedAt: updatedAt
            }
            
            // run update
            return statDocRef.set(data, { merge: true });
        })
            .catch((err: any) => console.log(err) )
    } else {
        return 0;
    }
});
