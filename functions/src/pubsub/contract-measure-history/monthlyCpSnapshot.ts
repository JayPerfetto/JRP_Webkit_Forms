

import { db, admin } from '../../global';
import * as functions from 'firebase-functions';
import { IContractMeasure } from '../../models/contracts/contractMeasure';

export const mthlyCpSnapshot = functions.pubsub.schedule('0 0 1 * *').onRun(async (context) => {

    const contractRef = await db.collection('Contract').get();
    
    contractRef.forEach(async (docRef: any) => {
        const batch = db.batch();

        const contractMeasuresRef = await db.collection('ContractMeasures')
            .where('contractAbbreviation', '==', docRef.data().contractID)
            .get();
        
        let rawScore = 0;
        const measures: any[] = [];
        const measureCount = contractMeasuresRef.size;
        const contractID = docRef.data().contractID;
        if (contractMeasuresRef.length > 0) {
            contractMeasuresRef.forEach((measureRef: any) => {
                const measure: IContractMeasure = measureRef.data();
                measures.push(measure);
                if (measure.numer && measure.denom) {
                    measure.performanceYTD = measure.numer / measure.denom * 100;
                    rawScore += measure.performanceYTD;
                    batch.set(db.collection('ContractMeasures').doc(measureRef.id), measure, {merge: true});
    
                }
            });
        }

        const snapshot = {
            measures: measures,
            measureCount: contractMeasuresRef.size,
            monthlyAvgScore: rawScore / measureCount,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        }

        const cpSnapshotRef = db.collection(`Contract/${docRef.id}/MeasurePerformanceHistory`).doc();

        batch.set(cpSnapshotRef, snapshot);
        batch.commit()
            .then(() => {
                console.log(contractID + ' Job Complete')
            })
            .catch((error: any) => console.log(error));
    });
});
