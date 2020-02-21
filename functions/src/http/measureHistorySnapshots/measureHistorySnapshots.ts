import * as functions from 'firebase-functions';
import { db, admin } from '../../global';
import { IContractMeasure } from '../../models/contracts/contractMeasure';

export const triggerMeasureHistoryCapture = functions.https.onRequest(async (req, res) => {
    try {
        const requestResponse: any[] = [];
        const contractRef = await db.collection('Contract').get();
    
        contractRef.forEach(async (docRef: any) => {
            const contractMeasuresRef = await db.collection('ContractMeasures')
                .where('contractAbbreviation', '==', docRef.data().contractID)
                .get();
            
            let rawScore = 0;
            const measures: any[] = [];
            const measureCount = contractMeasuresRef.size;
            const contractID = docRef.data().contractID;

            contractMeasuresRef.forEach((measureRef: any) => {
                const measure: IContractMeasure = measureRef.data();
                measures.push(measure);
                if (measure.numer && measure.denom) {
                    measure.performanceYTD = measure.numer / measure.denom * 100;
                    rawScore += measure.performanceYTD;
                }
            });

            const snapshot = {
                measures: measures,
                measureCount: contractMeasuresRef.size,
                monthlyAvgScore: rawScore / measureCount,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            }

            const cpSnapshotRef = db.collection(`Contract/${docRef.id}/MeasurePerformanceHistory`).doc();
            const batch = db.batch();
            batch.set(cpSnapshotRef, snapshot);
            batch.commit()
                .then(() => {
                    console.log(contractID + ' Job Complete');
                    requestResponse.push({
                        contract: contractID,
                        measureCount: measures.length,
                        snapshot: snapshot
                    });

                })
                .catch((error: any) => console.log(error));
        });

        res.status(200).send(JSON.stringify(requestResponse));
    } catch (error) {
        res.status(500).send(error);
    }
});