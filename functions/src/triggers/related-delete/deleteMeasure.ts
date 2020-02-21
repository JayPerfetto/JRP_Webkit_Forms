import * as functions from 'firebase-functions';
import { db } from '../../global';

// TESTED AND WORKING
export const onMesureDeleteSync = functions.firestore
.document('Measure/{docId}')
.onDelete(async (snap, context) => {
    const measure = snap.data();
    if (measure)
    {
        const scorecardData: any[] = [];
        const batch = db.batch();

        const scoreCardsRef = db.collection('MeasureScorecard');
        const snapshot = await scoreCardsRef.where('masterAbbreviation', '==', measure.masterAbbreviation).get()
        if (snapshot.empty) {
            console.log('No matching scorecards.');
            return;
        }

        snapshot.forEach((doc: any) => {
            scorecardData.push({ id: doc.id, ...doc.data() });
        });
        
        const scorecard = scorecardData[0];
        const allContractMeasuresRef = await db.collection(`ContractMeasures`).where('masterAbbreviation', '==', measure.masterAbbreviation).get();
        
        // Delete all contract measures matching measure
        allContractMeasuresRef.forEach((doc: any) => {
            batch.delete(db.collection(`ContractMeasures`).doc(`${doc.id}`));
        });

        // Delete scoreboard record for measure
        batch.delete(db.collection(`MeasureScorecard`).doc(`${scorecard.id}`));

        return batch.commit().then(() => console.log("batch completed - deleted measure " + measure.masterAbbreviation));
    } else {
        return null;
    }
});