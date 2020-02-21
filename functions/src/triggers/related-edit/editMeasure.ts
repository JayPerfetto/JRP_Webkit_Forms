import * as functions from 'firebase-functions';
import { db } from '../../global';

// TESTED AND WORKING
export const onMesureAbbrevChangeSync = functions.firestore
.document('Measure/{docId}')
.onUpdate(async (snap, context) => {
    const after = snap.after.data();
    const before = snap.before.data();
    if (after && before)
    {
        if (after.masterAbbreviation !== before.masterAbbreviation || after.measure !== before.measure) {
            const batch = db.batch();
    
            const scoreCardsRef = db.collection('MeasureScorecard');
            const snapshot = await scoreCardsRef
                .where('masterAbbreviation', '==', before.masterAbbreviation).get()
            
            if (snapshot.empty) {
                console.log('No matching scorecards.');
                return;
            }

            // Update all scorecards matching measure
            snapshot.forEach((doc: any) => {
                const scoreCard = { id: doc.id, ...doc.data() };
                scoreCard.masterAbbreviation = after.masterAbbreviation;
                scoreCard.measure = after.measure;
                const scorecardRef = scoreCardsRef.doc(doc.id);
                batch.set(scorecardRef, scoreCard, {merge: true});
            });
            
            const allContractMeasuresRef = await db.collection(`ContractMeasures`)
                .where('masterAbbreviation', '==', before.masterAbbreviation).get();
            
            // Update all contract measures matching measure
            allContractMeasuresRef.forEach((doc: any) => {
                const measure = doc.data();
                measure.masterAbbreviation = after.masterAbbreviation;
                measure.measure = after.measure;
                batch.set(db.collection(`ContractMeasures`).doc(`${doc.id}`), measure, {merge: true} );
            });
    
            return batch.commit()
                .then(() => console.log("batch completed - updated measure " + after.masterAbbreviation));
        }
    } else {
        return null;
    }
});