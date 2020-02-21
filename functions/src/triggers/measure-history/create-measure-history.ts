import * as functions from 'firebase-functions';
import { db, admin } from '../../global';

// TESTED AND WORKING
export const createMeasureHistory = functions.firestore
.document('ContractMeasures/{docId}')
.onUpdate(async (snap, context) => {
    const before = snap.before.data();
    const after = snap.after.data();
    const id = context.params.docId;

    if (before && after)
    {
        const batch = db.batch();

        // Create ref to new doc in history sub-collection 
        const historicalRef = db.collection('ContractMeasures').doc(id).collection('History').doc();
        
        before.changes = [];
        
        // Find out what changed:
        for (const prop in before) {
            if (Object.prototype.hasOwnProperty.call(before, prop)) {
                if (typeof before[prop] !== 'object' && before[prop] !== null) {
                    if (before[prop] !== after[prop]) {
                        before.changes.push({
                            prop: prop,
                            before: before[prop],
                            after: after[prop],
                            updateUser: after.updateUser
                        });
                    }
                }
            }
        }
        before.updatedAt = admin.firestore.FieldValue.serverTimestamp()
        before.createdAt = admin.firestore.FieldValue.serverTimestamp()
        batch.set(historicalRef, before)
        return batch.commit()
            .then(() => console.log("batch completed - updated measure " + before.masterAbbreviation));
    } else {
        return null;
    }
});